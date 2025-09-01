import type { HomeAssistant } from './locale';

export interface DailyForecast {
  date: string;
  high?: number;
  low?: number;
  condition?: string;
  precipitation_probability?: number;
}

export async function fetchDailyForecast(
  hass: HomeAssistant,
  entity: string,
): Promise<DailyForecast[]> {
  try {
    const result = await hass.callWS?.({
      type: 'weather/get_forecast',
      entity_id: entity,
      forecast_type: 'daily',
    });
    if (
      result &&
      typeof result === 'object' &&
      'forecast' in result &&
      Array.isArray((result as { forecast: unknown }).forecast)
    ) {
      return (result as { forecast: Record<string, unknown>[] }).forecast.map((day) => ({
        date: String(day.datetime),
        high: typeof day.temperature === 'number' ? day.temperature : undefined,
        low: typeof day.templow === 'number' ? day.templow : undefined,
        condition: typeof day.condition === 'string' ? day.condition : undefined,
        precipitation_probability:
          typeof day.precipitation_probability === 'number'
            ? day.precipitation_probability
            : undefined,
      }));
    }
  } catch (err) {
    // ignore errors and fall through to empty array
  }
  return [];
}
