import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { HomeAssistant } from './locale';
import { formatWeekday, formatDate } from './locale';
import { getDayKey, HOURS } from './utils';
import type { CalendarConfig, FamilyGridCalendarConfig } from './config';
import { DEFAULT_REFRESH_MINUTES } from './config';
import type { DailyForecast } from './weather';
import { fetchDailyForecast } from './weather';

interface CalendarEvent {
  start: Date;
  end: Date;
  title: string;
  calendar: CalendarConfig;
  allDay?: boolean;
}

interface PositionedEvent extends CalendarEvent {
  lane: number;
  lanes: number;
}

interface CustomCardEntry {
  type: string;
  name: string;
  description: string;
}

const HOUR_HEIGHT = 48; // px

@customElement('family-grid-calendar')
export class FamilyGridCalendar extends LitElement {
  @property({ attribute: false }) hass?: HomeAssistant;

  @state() private _config?: FamilyGridCalendarConfig;
  @state() private _eventsByDay: Record<string, PositionedEvent[]> = {};
  @state() private _allDayEventsByDay: Record<string, CalendarEvent[]> = {};
  @state() private _weatherByDay: Record<string, DailyForecast> = {};
  @state() private _activeCalendars: Set<string> = new Set();

  private _timer?: number;

  setConfig(config: FamilyGridCalendarConfig) {
    if (!config.calendars || config.calendars.length === 0) {
      throw new Error('At least one calendar entity is required');
    }
    this._config = {
      data_refresh_minutes: DEFAULT_REFRESH_MINUTES,
      ...config,
    };
    this._activeCalendars = new Set(config.calendars.map((c) => c.entity));
    this._startTimer();
    this._fetchData();
  }

  connectedCallback() {
    super.connectedCallback();
    this._startTimer();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._timer) {
      clearInterval(this._timer);
      this._timer = undefined;
    }
  }

  private _startTimer() {
    if (this._timer) clearInterval(this._timer);
    const mins = this._config?.data_refresh_minutes ?? DEFAULT_REFRESH_MINUTES;
    this._timer = window.setInterval(() => this._fetchData(), mins * 60 * 1000);
  }

  private async _fetchData() {
    if (!this.hass || !this._config) return;
    const hass = this.hass;
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date(start);
    end.setDate(start.getDate() + 7);
    const startISO = start.toISOString();
    const endISO = end.toISOString();

    const eventsByDay: Record<string, CalendarEvent[]> = {};
    interface HassCalEvent {
      start?: string;
      start_time?: string;
      startTime?: string;
      end?: string;
      end_time?: string;
      endTime?: string;
      summary?: string;
      title?: string;
      all_day?: boolean;
      allDay?: boolean;
    }
    await Promise.all(
      this._config.calendars.map(async (cal) => {
        if (!this._activeCalendars.has(cal.entity)) return;
        try {
          const path = `calendars/${cal.entity}?start=${startISO}&end=${endISO}`;
          const data: HassCalEvent[] = hass.callApi
            ? await hass.callApi<HassCalEvent[]>('GET', path)
            : ((await fetch(`/api/${path}`).then((r) => r.json())) as HassCalEvent[]);
          for (const ev of data || []) {
            const evStart = new Date(ev.start || ev.start_time || ev.startTime || 0);
            const evEnd = new Date(ev.end || ev.end_time || ev.endTime || 0);
            const key = getDayKey(evStart);
            (eventsByDay[key] ||= []).push({
              start: evStart,
              end: evEnd,
              title: ev.summary || ev.title || '',
              calendar: cal,
              allDay: ev.all_day || ev.allDay || false,
            });
          }
        } catch (_e) {
          // ignore individual calendar errors
        }
      }),
    );

    const positioned: Record<string, PositionedEvent[]> = {};
    const allDay: Record<string, CalendarEvent[]> = {};
    Object.entries(eventsByDay).forEach(([key, list]) => {
      const timed = list.filter((e) => !e.allDay);
      positioned[key] = this._positionEvents(timed);
      allDay[key] = list.filter((e) => e.allDay);
    });
    this._eventsByDay = positioned;
    this._allDayEventsByDay = allDay;

    if (this._config.weather_entity) {
      const forecast = await fetchDailyForecast(this.hass, this._config.weather_entity);
      const wx: Record<string, DailyForecast> = {};
      forecast.forEach((d) => {
        const key = String(d.date).split('T')[0];
        wx[key] = d;
      });
      this._weatherByDay = wx;
    }
  }

  private _positionEvents(events: CalendarEvent[]): PositionedEvent[] {
    const sorted = [...events].sort((a, b) => a.start.getTime() - b.start.getTime());
    const laneEnd: number[] = [];
    const positioned: PositionedEvent[] = [];
    for (const ev of sorted) {
      let lane = laneEnd.findIndex((end) => end <= ev.start.getTime());
      if (lane === -1) {
        lane = laneEnd.length;
        laneEnd.push(ev.end.getTime());
      } else {
        laneEnd[lane] = ev.end.getTime();
      }
      positioned.push({ ...ev, lane, lanes: 0 });
    }
    const lanes = laneEnd.length || 1;
    return positioned.map((ev) => ({ ...ev, lanes }));
  }

  private _renderTimeAxis() {
    return HOURS.map((h) => html`<div>${h}</div>`);
  }

  private _renderEvent(ev: PositionedEvent) {
    const start = ev.start.getHours() * 60 + ev.start.getMinutes();
    const end = ev.end.getHours() * 60 + ev.end.getMinutes();
    const top = (start / 60) * HOUR_HEIGHT;
    const height = ((end - start) / 60) * HOUR_HEIGHT;
    const width = 100 / ev.lanes;
    const left = ev.lane * width;
    return html`<div
      class="event_block"
      style="top:${top}px;height:${height}px;left:${left}%;width:${width}%;background:${ev.calendar
        .color}"
    >
      ${ev.title}
    </div>`;
  }

  render() {
    const hass = this.hass ?? { locale: { language: 'en' } };
    if (!this._config) return html``;
    const days: Date[] = [];
    const start = new Date();
    for (let i = 0; i < 7; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      days.push(d);
    }

    return html`
      <div class="calendar_container">
        <div class="calendar_header">
          ${this._config.calendars.map(
            (c) =>
              html`<button
                style="color:${c.color}"
                @click=${() => this._toggleCalendar(c.entity)}
                ?disabled=${!this._activeCalendars.has(c.entity)}
              >
                ${c.name ?? c.entity}
              </button>`,
          )}
        </div>
        <div class="weekday_header row">
          <div class="time_axis spacer"></div>
          ${days.map((d) => {
            const key = getDayKey(d);
            const wx = this._weatherByDay[key];
            return html`<div class="weekday_header_day">
              <div>${formatWeekday(hass, d)} ${formatDate(hass, d)}</div>
              ${wx
                ? html`<div class="weather">
                    <ha-icon icon="mdi:weather-${wx.condition}"></ha-icon>
                    <span class="high">${wx.high?.toFixed(0)}</span>
                    <span class="low">${wx.low?.toFixed(0)}</span>
                  </div>`
                : ''}
            </div>`;
          })}
        </div>
        <div class="all_day row">
          <div class="time_axis spacer"></div>
          ${days.map((d) => {
            const key = getDayKey(d);
            const events = this._allDayEventsByDay[key] ?? [];
            return html`<div class="all_day_area">
              ${events.map(
                (ev) =>
                  html`<div class="all_day_event" style="background:${ev.calendar.color}">
                    ${ev.title}
                  </div>`,
              )}
            </div>`;
          })}
        </div>
        <div class="main row">
          <div class="time_axis">${this._renderTimeAxis()}</div>
          ${days.map((d) => {
            const key = getDayKey(d);
            const events = this._eventsByDay[key] ?? [];
            return html`<div class="day_columns">
              ${events.map((ev) => this._renderEvent(ev))}
            </div>`;
          })}
        </div>
      </div>
    `;
  }

  private _toggleCalendar(entity: string) {
    if (this._activeCalendars.has(entity)) {
      this._activeCalendars.delete(entity);
    } else {
      this._activeCalendars.add(entity);
    }
    this.requestUpdate();
    this._fetchData();
  }

  static styles = css`
    :host {
      display: block;
      --hour-height: ${HOUR_HEIGHT}px;
      font-family: var(--ha-card-font-family, var(--ha-font-family));
    }
    .calendar_container {
      border: 1px solid var(--divider-color);
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color, #000);
    }
    .calendar_header {
      display: flex;
      gap: 4px;
      padding: 4px;
    }
    .calendar_header button {
      background: none;
      border: 1px solid var(--divider-color);
      border-radius: 4px;
      padding: 2px 6px;
      font-size: 0.8rem;
    }
    .row {
      display: flex;
    }
    .weekday_header_day {
      flex: 1;
      padding: 4px;
      border-bottom: 1px solid var(--divider-color);
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-sizing: border-box;
    }
    .weekday_header_day .weather {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 0.75rem;
      justify-content: flex-end;
    }
    .weekday_header_day .weather .high {
      color: var(--error-color, #f44336);
    }
    .weekday_header_day .weather .low {
      color: var(--info-color, #2196f3);
    }
    .all_day_area {
      flex: 1;
      min-height: 24px;
      border-bottom: 1px solid var(--divider-color);
      display: flex;
      flex-direction: column;
      gap: 2px;
      padding: 2px;
      box-sizing: border-box;
    }
    .all_day_event {
      padding: 2px;
      border-radius: 4px;
      color: #fff;
      font-size: 0.75rem;
    }
    .time_axis {
      display: flex;
      flex-direction: column;
      width: 40px;
      font-size: 0.75rem;
    }
    .time_axis div {
      height: var(--hour-height);
      border-top: 1px solid var(--divider-color);
    }
    .time_axis.spacer {
      border-top: none;
    }
    .main .day_columns {
      position: relative;
      flex: 1;
      height: calc(var(--hour-height) * 24);
      border-left: 1px solid var(--divider-color);
    }
    .event_block {
      position: absolute;
      padding: 2px;
      box-sizing: border-box;
      color: #fff;
      font-size: 0.75rem;
      border-radius: 4px;
      overflow: hidden;
    }
  `;
}

const win = window as unknown as { customCards?: CustomCardEntry[] };
win.customCards = win.customCards || [];
win.customCards.push({
  type: 'family-grid-calendar',
  name: 'Family Grid Calendar',
  description: 'Week-view calendar with optional weather.',
});

declare global {
  interface HTMLElementTagNameMap {
    'family-grid-calendar': FamilyGridCalendar;
  }
}
