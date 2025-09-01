# Family Grid Calendar Card

A light, minimal custom dashboard card for Home Assistant that displays multiple
calendar entities in a seven‑day grid and enriches weekday headers with daily
weather forecasts. The build output `dist/family-grid-calendar.js` is committed
for [HACS](https://hacs.xyz/) distribution.

## Features

- Combine several `calendar.*` entities with per‑calendar color coding
- All‑day and timed events rendered in separate lanes to avoid overlap
- Optional weather integration showing icon, high and low temperatures (high in
  red, low in blue) for each weekday
- Configurable refresh interval (`data_refresh_minutes`, defaults to 15)
- Appears in the Lovelace card picker once added as a resource

### Example configuration

```yaml
type: custom:family-grid-calendar
calendars:
  - entity: calendar.nuesken_family_gmail
    name: Family
    color: '#3f51b5'
  - entity: calendar.dennis_nuesken_gmail
    name: Dennis
    color: '#9c27b0'
  - entity: calendar.auri_nuesken_gmail_com
    name: Auri
    color: '#03a9f4'
weather_entity: weather.integra_langsbau_1_3
data_refresh_minutes: 1
```

> **Note:** At least one calendar entity must be provided.

## Development

This project uses [Vite](https://vitejs.dev/) and [Lit](https://lit.dev/).
To set up a development environment:

```bash
npm install
npm start
```

Before submitting changes run:

```bash
npm run format
npm run lint
npm run build
```

See `CONTRIBUTING.md` for branch strategy and further instructions.
