/* eslint-disable import/order */
/**
 * Styles for the full-grid view
 */
import { css } from 'lit';

export const fullGridStyles = css`
  .ccp-full-grid {
    display: flex;
    flex-direction: column;
  }

  .ccp-calendar-header {
    display: flex;
    gap: 4px;
    margin-bottom: 8px;
  }

  .ccp-filter-btn {
    background: none;
    border: none;
    cursor: pointer;
    font: inherit;
  }

  .ccp-weekday-header {
    display: grid;
    grid-template-columns: repeat(var(--full-grid-days, 7), 1fr);
    text-align: center;
    font-weight: bold;
    margin-bottom: 4px;
  }

  .ccp-grid-body {
    display: flex;
  }

  .ccp-time-axis {
    display: flex;
    flex-direction: column;
    width: 50px;
    font-size: 12px;
  }

  .ccp-time-axis > div {
    height: 60px;
  }

  .ccp-day-columns {
    flex: 1;
    display: grid;
    grid-template-columns: repeat(var(--full-grid-days, 7), 1fr);
    position: relative;
  }

  .ccp-day-column {
    border-left: 1px solid var(--calendar-card-line-color-vertical);
    position: relative;
  }

  .ccp-all-day-area {
    min-height: 24px;
  }

  .ccp-events {
    position: relative;
    height: 1440px; /* 24h * 60min */
  }

  .ccp-event-block {
    position: absolute;
    background-color: var(--calendar-card-line-color-vertical);
    color: var(--primary-text-color);
    border-radius: 4px;
    padding: 2px;
    box-sizing: border-box;
    overflow: hidden;
    font-size: 12px;
  }
`;
