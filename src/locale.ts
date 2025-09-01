export interface HomeAssistant {
  localize?: (key: string, ...args: unknown[]) => string;
  callWS?: <T>(msg: unknown) => Promise<T>;
  locale: {
    language: string;
    time_format?: string;
  };
}

export const formatWeekday = (hass: HomeAssistant, date: Date): string =>
  new Intl.DateTimeFormat(hass.locale.language, { weekday: 'short' }).format(date);

export const formatDate = (hass: HomeAssistant, date: Date): string =>
  new Intl.DateTimeFormat(hass.locale.language, { day: 'numeric', month: 'short' }).format(date);

export const formatTime = (hass: HomeAssistant, date: Date): string =>
  new Intl.DateTimeFormat(hass.locale.language, { hour: '2-digit', minute: '2-digit' }).format(
    date,
  );
