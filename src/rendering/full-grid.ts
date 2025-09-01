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
    <div class="ccp-weekday-header">${days.map((d) => html`<div>${d.weekday} ${d.day}</div>`)}</div>
    <div class="ccp-grid-body">
      ${renderTimeAxis()}
      <div class="ccp-day-columns">${days.map((d) => renderDayColumn(d))}</div>
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
function renderDayColumn(day: Types.EventsByDay): TemplateResult {
  const allDayEvents = day.events.filter((e) => !e.start.dateTime);
  const timedPositions = calculateGridPositions(day.events.filter((e) => e.start.dateTime));

  return html`<div class="ccp-day-column">
    <div class="ccp-all-day-area">
      ${allDayEvents.map((ev) => html`<div class="ccp-event-block">${ev.summary}</div>`)}
    </div>
    <div class="ccp-events">
      ${timedPositions.map(
        (p) =>
          html`<div
            class="ccp-event-block"
            style="top:${p.startMinute}px;height:${p.endMinute - p.startMinute}px;left:${(p.lane /
              p.laneCount) *
            100}%;width:${(1 / p.laneCount) * 100}%"
          >
            ${p.event.summary}
          </div>`,
      )}
    </div>
  </div>`;
}
