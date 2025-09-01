import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { HomeAssistant } from './locale';
import { formatWeekday, formatDate } from './locale';
import { getDayKey, HOURS } from './utils';
import type { CalendarConfig } from './config';
import { DEFAULT_REFRESH_MINUTES } from './config';
import type { DailyForecast } from './weather';

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

const HOUR_HEIGHT = 48; // px

const MOCK_CALENDARS: CalendarConfig[] = [
  { entity: 'calendar.nuesken_family_gmail', name: 'Family', color: '#3f51b5' },
  { entity: 'calendar.dennis_nuesken_gmail', name: 'Dennis', color: '#9c27b0' },
  { entity: 'calendar.auri_nuesken_gmail_com', name: 'Auri', color: '#03a9f4' },
];

@customElement('family-grid-calendar')
export class FamilyGridCalendar extends LitElement {
  @property({ attribute: false }) hass?: HomeAssistant;

  @state() private _eventsByDay: Record<string, PositionedEvent[]> = {};
  @state() private _weatherByDay: Record<string, DailyForecast> = {};

  private _timer?: number;

  connectedCallback() {
    super.connectedCallback();
    this._generateMockData();
    const refresh = DEFAULT_REFRESH_MINUTES * 60 * 1000;
    this._timer = window.setInterval(() => this._generateMockData(), refresh);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._timer) {
      clearInterval(this._timer);
      this._timer = undefined;
    }
  }

  private _generateMockData() {
    const today = new Date();
    const events: Record<string, PositionedEvent[]> = {};
    const weather: Record<string, DailyForecast> = {};
    for (let i = 0; i < 7; i++) {
      const day = new Date(today);
      day.setDate(today.getDate() + i);
      const key = getDayKey(day);

      const e1Start = new Date(day);
      e1Start.setHours(9, 0, 0, 0);
      const e1End = new Date(day);
      e1End.setHours(10, 30, 0, 0);

      const e2Start = new Date(day);
      e2Start.setHours(9, 30, 0, 0);
      const e2End = new Date(day);
      e2End.setHours(12, 0, 0, 0);

      const e3Start = new Date(day);
      e3Start.setHours(13, 0, 0, 0);
      const e3End = new Date(day);
      e3End.setHours(15, 0, 0, 0);

      const dailyEvents: CalendarEvent[] = [
        { start: e1Start, end: e1End, title: 'Breakfast', calendar: MOCK_CALENDARS[0] },
        { start: e2Start, end: e2End, title: 'Team Meeting', calendar: MOCK_CALENDARS[1] },
        { start: e3Start, end: e3End, title: 'Study', calendar: MOCK_CALENDARS[2] },
      ];
      events[key] = this._positionEvents(dailyEvents);

      weather[key] = {
        date: key,
        high: 25 + i,
        low: 15 + i,
        condition: ['sunny', 'cloudy', 'rainy'][i % 3],
      };
    }
    this._eventsByDay = events;
    this._weatherByDay = weather;
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
          ${MOCK_CALENDARS.map(
            (c) => html`<button style="color:${c.color}">${c.name ?? c.entity}</button>`,
          )}
        </div>
        <div class="weekday_header row">
          <div class="time_axis spacer"></div>
          ${days.map((d) => {
            const key = getDayKey(d);
            const wx = this._weatherByDay[key];
            return html`<div class="weekday_header">
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
          ${days.map(() => html`<div class="all_day_area"></div>`)}
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
    .weekday_header {
      flex: 1;
      text-align: center;
      padding: 4px;
      border-bottom: 1px solid var(--divider-color);
    }
    .weekday_header .weather {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
      font-size: 0.75rem;
    }
    .weekday_header .weather .high {
      color: var(--error-color, #f44336);
    }
    .weekday_header .weather .low {
      color: var(--info-color, #2196f3);
    }
    .all_day_area {
      flex: 1;
      min-height: 24px;
      border-bottom: 1px solid var(--divider-color);
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

declare global {
  interface HTMLElementTagNameMap {
    'family-grid-calendar': FamilyGridCalendar;
  }
}
