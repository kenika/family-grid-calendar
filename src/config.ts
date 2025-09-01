export interface CalendarConfig {
  entity: string;
  name?: string;
  color?: string;
  weather_entity?: string;
}

export interface FamilyGridCalendarConfig {
  type: 'custom:family-grid-calendar';
  calendars: CalendarConfig[];
  weather_entity?: string;
  data_refresh_minutes?: number;
}

export const DEFAULT_REFRESH_MINUTES = 15;
