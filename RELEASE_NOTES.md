# Release Notes

## Version 3.0.0

### 🌦️ Weather Integration

Calendar Card Pro now supports displaying weather forecasts directly alongside your calendar events! This powerful new integration allows you to see the expected weather conditions for each day or for specific events.

#### Features

- **Dual Display Positions**: Show weather in the date column, event column, or both
- **Customizable Information**: Choose what weather data to display (conditions, high/low temperatures)
- **Per-Position Styling**: Control the appearance of weather data independently in each position
- **Automatic Forecast Matching**: Weather data automatically matches the correct day or event time
- **Home Assistant Integration**: Uses your existing weather entities and requires no additional setup

#### Configuration Options

```yaml
type: custom:calendar-card-pro
# Basic weather configuration
weather:
  entity: weather.your_weather_entity
  position: date  # Options: 'date', 'event', or 'both'
  show_conditions: true
  show_high_temp: true
  show_low_temp: false

# Advanced styling for each position
weather:
  entity: weather.your_weather_entity
  position: both
  show_conditions: true
  show_high_temp: true
  show_low_temp: true
  # Date column styling
  date:
    icon_size: '14px'
    font_size: '12px'
    color: '#3498db'
  # Event column styling
  event:
    icon_size: '16px'
    font_size: '13px'
    color: 'var(--primary-color)'
```

#### Weather Configuration Options

| Option            | Type    | Default                       | Description                                                                                 |
| ----------------- | ------- | ----------------------------- | ------------------------------------------------------------------------------------------- |
| `entity`          | string  | -                             | Weather entity to use for forecasts                                                         |
| `position`        | string  | `'date'`                      | Where to show weather data: `'date'` (date column), `'event'` (next to events), or `'both'` |
| `show_conditions` | boolean | `true`                        | Whether to show weather condition icons                                                     |
| `show_high_temp`  | boolean | `true`                        | Whether to show high temperature                                                            |
| `show_low_temp`   | boolean | `false`                       | Whether to show low temperature                                                             |
| `date.icon_size`  | string  | `'14px'`                      | Size of weather icons in date column                                                        |
| `date.font_size`  | string  | `'12px'`                      | Size of weather text in date column                                                         |
| `date.color`      | string  | `'var(--primary-text-color)'` | Color of weather text and icons in date column                                              |
| `event.icon_size` | string  | `'14px'`                      | Size of weather icons in event column                                                       |
| `event.font_size` | string  | `'12px'`                      | Size of weather text in event column                                                        |
| `event.color`     | string  | `'var(--primary-text-color)'` | Color of weather text and icons in event column                                             |

### Other Changes

- **Performance Improvements**: Better handling of large calendars with many events
- **Internal Code Restructuring**: Improved maintainability and extensibility
- **Bug Fixes**: Various minor fixes and improvements

## Version 2.4

### 🌟 Today Indicator

Highlight today with customizable dot, pulse, glow effect, emoji, or custom icon.

### 🎨 Today's Date Styling

Customize the appearance of today's date in the calendar with dedicated color options.

### 🚦 Event Progress Bars

Visualize how far an event has progressed with optional progress bars.

### ✂️ Split Multi-Day Events

Display multi-day events on every day they cover.

### 🧠 Enhanced Compact Mode Controls

More precise control over what's displayed in compact vs expanded views.

## Version 2.3

### ⏳ Countdown Display

Show how much time remains until an event starts with the new `show_countdown` option.

### 🌅 Weekend Day Styling

Style weekend days differently with dedicated color options.

### 📆 Relative Date Offsets

Define a floating start date relative to the current day instead of fixed dates.

## Version 2.2

### ⚙️ Advanced Event Filtering

Include or exclude specific events with `blocklist` and `allowlist` patterns per entity.

### 🔄 Filter Duplicate Events

Remove redundant events that appear in multiple calendars.

### 🌍 Smart Country Filtering

Precise control over country name display in locations.

### 🏷️ Enhanced Calendar Labels

In addition to emojis and text labels, you can now also use Material Design icons and custom images.

### 🎨 Customizable Empty Day Styling

Control how empty days appear with `empty_day_color`.

## Version 2.1

### 📅 Week Numbers & Visual Separators

Better visual organization with week number pills and customizable separators.

### 📊 Per-Calendar Event Limits

Control how many events appear from each calendar separately.

### 📏 Fixed Height Control

Set exact card height with improved scrolling behavior.

## Version 2.0

### 🌈 Custom Styling Per Calendar

Add accent colors for vertical lines and opaque backgrounds to create visual hierarchy.

### 🏷️ Calendar Labels

Add emoji or text identifiers for each calendar source.

### 🔧 Advanced Display Controls

Per-calendar time and location display settings.

### 📆 Custom Start Date

View calendars from any date, not just today.

### 📱 Maximum Height with Scrolling

Set a maximum card size with scrollable content.
