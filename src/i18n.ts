import type { HomeAssistant } from './locale';

export const tr = (hass: HomeAssistant | undefined, key: string): string =>
  hass?.localize?.(key) ?? key;
