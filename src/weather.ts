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
  // 1. Try websocket daily forecast
  try {
    const result = await hass.callWS?.({
      type: 'weather/get_forecast',
      entity_id: entity,
      forecast_type: 'daily',
    });
    const daily = parseDaily(result);
    if (daily.length) return daily;
  } catch (_e) {
    // ignore and try next layer
  }

  // 2. Fallback to hourly forecast and aggregate
  try {
    const result = await hass.callWS?.({
      type: 'weather/get_forecast',
      entity_id: entity,
      forecast_type: 'hourly',
    });
    const hourly = Array.isArray((result as { forecast?: unknown[] })?.forecast)
      ? (result as { forecast: unknown[] }).forecast
      : undefined;
    if (hourly) {
      const aggregated = aggregateHourly(hourly as Record<string, unknown>[]);
      if (aggregated.length) return aggregated;
    }
  } catch (_e) {
    // ignore and try next layer
  }

  // 3. Fallback to entity state attributes
  const attrs = hass.states?.[entity]?.attributes;
  const forecast = Array.isArray(attrs?.forecast) ? (attrs?.forecast as unknown[]) : undefined;
  if (forecast && forecast.length) {
    const first = forecast[0] as Record<string, unknown>;
    const aggregated =
      'temperature' in first
        ? aggregateHourly(forecast as Record<string, unknown>[])
        : parseDaily({ forecast } as { forecast: unknown[] });
    if (aggregated.length) return aggregated;
  }

  return [];
}

function parseDaily(result: unknown): DailyForecast[] {
  if (
    result &&
    typeof result === 'object' &&
    'forecast' in result &&
    Array.isArray((result as { forecast: unknown }).forecast)
  ) {
    return (result as { forecast: Record<string, unknown>[] }).forecast.map((day) => ({
      date: String(day.datetime ?? day.datetime_iso ?? day.date),
      high: typeof day.temperature === 'number' ? day.temperature : undefined,
      low: typeof day.templow === 'number' ? day.templow : undefined,
      condition: typeof day.condition === 'string' ? day.condition : undefined,
      precipitation_probability:
        typeof day.precipitation_probability === 'number'
          ? day.precipitation_probability
          : undefined,
    }));
  }
  return [];
}

function aggregateHourly(hours: Record<string, unknown>[]): DailyForecast[] {
  const byDay: Record<string, DailyForecast & { count: Record<string, number> }> = {};
  for (const h of hours) {
    const date = String(h.datetime ?? h.datetime_iso ?? h.date).split('T')[0];
    const entry = (byDay[date] ||= {
      date,
      high: undefined,
      low: undefined,
      condition: undefined,
      precipitation_probability: undefined,
      count: {},
    });
    const temp = typeof h.temperature === 'number' ? h.temperature : undefined;
    if (temp !== undefined) {
      entry.high = entry.high === undefined ? temp : Math.max(entry.high, temp);
      entry.low = entry.low === undefined ? temp : Math.min(entry.low, temp);
    }
    const cond = typeof h.condition === 'string' ? h.condition : undefined;
    if (cond) entry.count[cond] = (entry.count[cond] ?? 0) + 1;
    const prec =
      typeof h.precipitation_probability === 'number' ? h.precipitation_probability : undefined;
    if (prec !== undefined)
      entry.precipitation_probability = Math.max(entry.precipitation_probability ?? 0, prec);
  }
  return Object.values(byDay).map(({ count, ...rest }) => {
    const condition = Object.entries(count).sort((a, b) => b[1] - a[1])[0]?.[0];
    return { ...rest, condition };
  });
}
