import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { CalendarConfig } from './config';
import { HOURS, getDayKey } from './utils';
import { formatWeekday, formatDate, HomeAssistant } from './locale';

interface MockEvent {
  title: string;
  start: string; // ISO string
  end: string; // ISO string
  calendar: CalendarConfig;
  allDay?: boolean;
}

interface MockWeather {
  icon: string;
  high: number;
  low: number;
}

const CALENDARS: CalendarConfig[] = [
  {
    entity: 'calendar.nuesken_family_gmail',
    name: 'Family',
    color: '#3f51b5',
  },
  { entity: 'calendar.dennis_nuesken_gmail', name: 'Dennis', color: '#9c27b0' },
  { entity: 'calendar.auri_nuesken_gmail_com', name: 'Auri', color: '#03a9f4' },
];

function createMockEvents(start: Date): MockEvent[] {
  const day = (offset: number) => {
    const d = new Date(start);
    d.setDate(d.getDate() + offset);
    return getDayKey(d);
  };
  return [
    {
      title: 'Breakfast',
      start: `${day(0)}T09:00:00`,
      end: `${day(0)}T10:00:00`,
      calendar: CALENDARS[0],
    },
    {
      title: 'Meeting',
      start: `${day(0)}T09:30:00`,
      end: `${day(0)}T11:00:00`,
      calendar: CALENDARS[1],
    },
    {
      title: 'Dentist',
      start: `${day(1)}T13:00:00`,
      end: `${day(1)}T14:00:00`,
      calendar: CALENDARS[2],
    },
    {
      title: 'Trip',
      start: `${day(2)}T00:00:00`,
      end: `${day(2)}T23:59:59`,
      calendar: CALENDARS[0],
      allDay: true,
    },
  ];
}

function createMockWeather(days: Date[]): Record<string, MockWeather> {
  const icons = [
    'mdi:weather-sunny',
    'mdi:weather-partly-cloudy',
    'mdi:weather-cloudy',
    'mdi:weather-rainy',
    'mdi:weather-fog',
    'mdi:weather-snowy',
    'mdi:weather-windy',
  ];
  const wx: Record<string, MockWeather> = {};
  days.forEach((d, i) => {
    wx[getDayKey(d)] = {
      icon: icons[i % icons.length],
      high: 20 + i,
      low: 10 - i,
    };
  });
  return wx;
}

interface PositionedEvent extends MockEvent {
  top: number;
  height: number;
  lane: number;
  lanes: number;
}

function layoutDayEvents(events: MockEvent[]): PositionedEvent[] {
  const dayStart = (date: Date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d;
  };
  const allDay = events.filter((e) => e.allDay);
  const timed = events.filter((e) => !e.allDay);
  const positioned: PositionedEvent[] = [];

  // all-day events occupy full width
  for (const ev of allDay) {
    positioned.push({ ...ev, top: 0, height: 100, lane: 0, lanes: 1 });
  }

  const laneEnd: number[] = [];
  timed
    .map((e) => ({
      ...e,
      startDate: new Date(e.start),
      endDate: new Date(e.end),
    }))
    .sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
    .forEach((ev) => {
      const startMin = (ev.startDate.getTime() - dayStart(ev.startDate).getTime()) / 60000;
      const endMin = (ev.endDate.getTime() - dayStart(ev.startDate).getTime()) / 60000;
      let lane = 0;
      while (laneEnd[lane] > startMin) lane++;
      laneEnd[lane] = endMin;
      const lanes = Math.max(laneEnd.length, 1);
      positioned.push({
        ...ev,
        top: (startMin / 1440) * 100,
        height: ((endMin - startMin) / 1440) * 100,
        lane,
        lanes,
      });
    });

  return positioned;
}

@customElement('family-grid-calendar')
export class FamilyGridCalendar extends LitElement {
  @property({ attribute: false }) hass?: HomeAssistant;

  @state() private _now = new Date();

  private _timer?: number;

  connectedCallback(): void {
    super.connectedCallback();
    this._timer = window.setInterval(() => {
      this._now = new Date();
    }, 60_000);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this._timer) window.clearInterval(this._timer);
  }

  render() {
    const start = new Date(this._now);
    start.setHours(0, 0, 0, 0);
    const days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(start);
      d.setDate(d.getDate() + i);
      return d;
    });

    const events = createMockEvents(start);
    const weather = createMockWeather(days);
    const eventsByDay = new Map<string, PositionedEvent[]>();
    days.forEach((d) => {
      const key = getDayKey(d);
      const dayEvents = events.filter((e) => getDayKey(new Date(e.start)) === key);
      eventsByDay.set(key, layoutDayEvents(dayEvents));
    });

    const hass = this.hass ?? { locale: { language: 'en' } };

    return html`
      <div class="calendar_container">
        <div class="calendar_header">
          ${CALENDARS.map(
            (cal) =>
              html`<button style="--cal-color: ${cal.color}">${cal.name ?? cal.entity}</button>`,
          )}
        </div>
        <div class="weekday_header">
          <div class="time_axis"></div>
          ${days.map((d) => {
            const key = getDayKey(d);
            const wx = weather[key];
            return html`<div class="day_header">
              <div class="label">${formatWeekday(hass, d)} ${formatDate(hass, d)}</div>
              ${wx
                ? html`<div class="weather">
                    <ha-icon .icon=${wx.icon}></ha-icon>
                    <span class="temp high">${wx.high}</span>/<span class="temp low"
                      >${wx.low}</span
                    >
                  </div>`
                : ''}
            </div>`;
          })}
        </div>
        <div class="all_day_area">
          <div class="time_axis"></div>
          ${days.map((d) => {
            const key = getDayKey(d);
            const dayEvents = eventsByDay.get(key)?.filter((e) => e.allDay) ?? [];
            return html`<div class="all_day_events">
              ${dayEvents.map(
                (e) =>
                  html`<div class="event_block" style="background: ${e.calendar.color}">
                    ${e.title}
                  </div>`,
              )}
            </div>`;
          })}
        </div>
        <div class="main_grid">
          <div class="time_axis">${HOURS.map((h) => html`<div class="hour">${h}</div>`)}</div>
          ${days.map((d) => {
            const key = getDayKey(d);
            const dayEvents = eventsByDay.get(key)?.filter((e) => !e.allDay) ?? [];
            return html`<div class="day_column">
              ${dayEvents.map(
                (e) =>
                  html`<div
                    class="event_block"
                    style="
                    top: ${e.top}%;
                    height: ${e.height}%;
                    left: ${(e.lane / e.lanes) * 100}%;
                    width: ${(1 / e.lanes) * 100}%;
                    background: ${e.calendar.color};
                  "
                  >
                    ${e.title}
                  </div>`,
              )}
            </div>`;
          })}
        </div>
      </div>
    `;
  }

  static styles = css`
    :host {
      display: block;
      font-family: sans-serif;
    }
    .calendar_header {
      display: flex;
      gap: 4px;
      padding: 4px;
    }
    .calendar_header button {
      border: none;
      background: var(--cal-color);
      color: #fff;
      padding: 4px 8px;
      border-radius: 4px;
      cursor: pointer;
    }
    .weekday_header,
    .all_day_area,
    .main_grid {
      display: flex;
    }
    .weekday_header .time_axis,
    .all_day_area .time_axis,
    .main_grid .time_axis {
      width: 60px;
    }
    .weekday_header .day_header,
    .all_day_area .all_day_events,
    .main_grid .day_column {
      flex: 1;
      border-left: 1px solid #ddd;
      position: relative;
    }
    .weekday_header .day_header {
      text-align: center;
      padding: 4px;
      background: #fff;
    }
    .weather {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 4px;
    }
    .weather .high {
      color: red;
    }
    .weather .low {
      color: blue;
    }
    .all_day_area {
      background: #f7f7f7;
    }
    .all_day_area .event_block {
      margin: 2px;
      padding: 2px;
      color: #fff;
      border-radius: 2px;
      font-size: 0.75rem;
    }
    .main_grid {
      height: 600px;
    }
    .main_grid .time_axis {
      display: flex;
      flex-direction: column;
    }
    .main_grid .time_axis .hour {
      flex: 1;
      font-size: 0.75rem;
      color: #666;
      border-bottom: 1px solid #eee;
    }
    .main_grid .day_column {
      background: repeating-linear-gradient(
        to bottom,
        transparent,
        transparent calc(100% / 24 - 1px),
        #eee calc(100% / 24 - 1px),
        #eee calc(100% / 24)
      );
    }
    .main_grid .event_block {
      position: absolute;
      padding: 2px;
      color: #fff;
      border-radius: 4px;
      font-size: 0.75rem;
      overflow: hidden;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'family-grid-calendar': FamilyGridCalendar;
  }
}
