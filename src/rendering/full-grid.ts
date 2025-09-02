/* eslint-disable import/order */
/**
 * Full-grid rendering module
 *
 * Provides an Outlook-like calendar layout with time axis and day columns.
 */

import { TemplateResult, html } from 'lit';
import * as Types from '../config/types';
import { calculateGridPositions } from '../utils/events';

/**
 * Render the full-grid calendar structure
 */
export function renderFullGrid(
  days: Types.EventsByDay[],
  config: Types.Config,
  _language: string,
  _weather: Types.WeatherForecasts,
  activeCalendars: string[],
  toggleCalendar: (entity: string) => void,
  _hass: Types.Hass | null,
): TemplateResult {
  const dayCount = days.length;

  return html`<div class="ccp-full-grid" style="--full-grid-days:${dayCount}">
    ${renderCalendarHeader(config, activeCalendars, toggleCalendar)}
    <div class="ccp-weekday-header">
      ${days.map(
        (d) => html`<div>${d.weekday} ${d.day}${config.show_month ? ` ${d.month}` : ''}</div>`,
      )}
    </div>
    <div class="ccp-grid-body">
      ${renderTimeAxis()}
      <div class="ccp-day-columns">${days.map((d) => renderDayColumn(d, config))}</div>
    </div>
  </div>`;
}

/**
 * Header with per-calendar filter buttons
 */
function renderCalendarHeader(
  config: Types.Config,
  activeCalendars: string[],
  toggleCalendar: (entity: string) => void,
): TemplateResult {
  return html`<div class="ccp-calendar-header">
    ${config.entities.map((e) => {
      const entity = typeof e === 'string' ? { entity: e, color: 'var(--primary-text-color)' } : e;
      const isActive = activeCalendars.includes(entity.entity);
      return html`<button
        class="ccp-filter-btn"
        style="color:${entity.color};opacity:${isActive ? '1' : '0.4'}"
        @click=${() => toggleCalendar(entity.entity)}
      >
        ${entity.label || entity.entity}
      </button>`;
    })}
  </div>`;
}

/**
 * Render left-hand time axis (00:00 - 23:00)
 */
function renderTimeAxis(): TemplateResult {
  return html`<div class="ccp-time-axis">
    ${Array.from({ length: 24 }, (_, i) => html`<div>${i.toString().padStart(2, '0')}:00</div>`)}
  </div>`;
}

/**
 * Render a single day column with all-day and timed events
 */
function renderDayColumn(day: Types.EventsByDay, config: Types.Config): TemplateResult {
  const date = new Date(day.timestamp);
  const isWeekend = date.getDay() === 0 || date.getDay() === 6;
  const isToday = new Date().toDateString() === date.toDateString();

  let columnStyle = '';
  if (isWeekend && config.weekend_day_color) {
    columnStyle = `background-color:${config.weekend_day_color};`;
  }
  if (isToday && config.today_day_color) {
    columnStyle = `background-color:${config.today_day_color};`;
  }

  const allDayEvents = day.events.filter((e) => !e.start.dateTime && !e._isEmptyDay);
  const timedPositions = calculateGridPositions(day.events.filter((e) => e.start.dateTime));

  return html`<div class="ccp-day-column" style=${columnStyle}>
    <div class="ccp-all-day-area">
      ${allDayEvents.map((ev) => {
        const eventColor = ev._matchedConfig?.color || config.event_color;
        return html`<div class="ccp-event-block" style="background-color:${eventColor}">
          ${ev.summary}
        </div>`;
      })}
    </div>
    <div class="ccp-events">
      ${timedPositions.map((p) => {
        const eventColor = p.event._matchedConfig?.color || config.event_color;
        return html`<div
          class="ccp-event-block"
          style="top:${p.startMinute}px;height:${p.endMinute - p.startMinute}px;left:${(p.lane /
            p.laneCount) *
          100}%;width:${(1 / p.laneCount) * 100}%;background-color:${eventColor}"
        >
          ${p.event.summary}
        </div>`;
      })}
    </div>
  </div>`;
}
