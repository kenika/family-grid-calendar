/**
 * Helper utilities for Calendar Card Pro
 *
 * General purpose utility functions for debouncing, memoization,
 * performance monitoring, and other common tasks.
 */

//-----------------------------------------------------------------------------
// COLOR UTILITIES
//-----------------------------------------------------------------------------

/**
 * Convert any color format to RGBA with specific opacity
 *
 * @param color - Color in any valid CSS format
 * @param opacity - Opacity value (0-100)
 * @returns RGBA color string
 */
export function convertToRGBA(color: string, opacity: number): string {
  // Handle theme variables
  if (color.startsWith('var(')) {
    return `var(--calendar-card-color-with-opacity, ${color.replace(')', `, ${opacity / 100})`)}`;
  }

  // Calculate opacity value (0-1 scale)
  const alpha = opacity / 100;

  // Handle known color formats

  // Already RGBA format
  if (color.startsWith('rgba(')) {
    return color.replace(/rgba\(([^,]+),([^,]+),([^,]+),[^)]+\)/, `rgba($1,$2,$3,${alpha})`);
  }

  // RGB format
  if (color.startsWith('rgb(')) {
    return color.replace('rgb(', 'rgba(').replace(')', `, ${alpha})`);
  }

  // Hex format (#RGB or #RRGGBB)
  if (color.startsWith('#')) {
    let r = 0,
      g = 0,
      b = 0;

    // Handle shorthand hex (#RGB)
    if (color.length === 4) {
      r = parseInt(color[1] + color[1], 16);
      g = parseInt(color[2] + color[2], 16);
      b = parseInt(color[3] + color[3], 16);
    }
    // Standard hex (#RRGGBB)
    else if (color.length === 7) {
      r = parseInt(color.substring(1, 3), 16);
      g = parseInt(color.substring(3, 5), 16);
      b = parseInt(color.substring(5, 7), 16);
    }

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  // Named colors and other formats - use a semi-transparent version
  return `${color}${opacity < 100 ? (opacity < 10 ? '0' : '') : ''}${opacity}`;
}

//-----------------------------------------------------------------------------
// INDICATOR TYPE DETECTION
//-----------------------------------------------------------------------------

/**
 * Checks if a string is an emoji
 *
 * @param str String to check
 * @returns True if the string is an emoji
 */
export function isEmoji(str: string): boolean {
  // Basic emoji detection using Unicode ranges
  const emojiRegex = /[\u{1F300}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;
  return str.length <= 2 && emojiRegex.test(str);
}

/**
 * Determine the type of today indicator based on the value
 *
 * @param value The today_indicator value from config
 * @returns Type of indicator ('dot', 'pulse', 'glow', 'mdi', 'image', 'emoji', 'none')
 */
export function getTodayIndicatorType(value: string | boolean): string {
  // Handle boolean/undefined cases
  if (value === undefined || value === false) {
    return 'none';
  }

  if (value === true) {
    return 'dot';
  }

  // Handle string values
  if (typeof value === 'string') {
    // Check for special values
    if (value === 'pulse' || value === 'glow') {
      return value;
    }

    // Check for MDI icon format
    if (value.startsWith('mdi:')) {
      return 'mdi';
    }

    // Check for image path
    if (
      value.startsWith('/') ||
      value.includes('.png') ||
      value.includes('.jpg') ||
      value.includes('.svg') ||
      value.includes('.webp') ||
      value.includes('.gif')
    ) {
      return 'image';
    }

    // Check if it's an emoji (this is an approximation)
    // More sophisticated emoji detection could be added if needed
    const emojiRegex = /[\p{Emoji}]/u;
    if (emojiRegex.test(value)) {
      return 'emoji';
    }

    // Default to dot for other strings
    return 'dot';
  }

  return 'none';
}

//-----------------------------------------------------------------------------
// ID GENERATION FUNCTIONS
//-----------------------------------------------------------------------------

/**
 * Generate a random instance ID
 *
 * @returns {string} Random alphanumeric identifier
 */
export function generateInstanceId(): string {
  return Math.random().toString(36).substring(2, 15);
}

/**
 * Generate a deterministic ID based on calendar config
 * Creates a stable ID that persists across page reloads
 * but changes when the data requirements change
 *
 * @param entities Array of calendar entities
 * @param daysToShow Number of days to display
 * @param showPastEvents Whether to show past events
 * @param startDate Optional custom start date
 * @returns Deterministic ID string based on input parameters
 */
export function generateDeterministicId(
  entities: Array<string | { entity: string; color?: string }>,
  daysToShow: number,
  showPastEvents: boolean,
  startDate?: string,
): string {
  // Extract just the entity IDs, normalized for comparison
  const entityIds = entities
    .map((e) => (typeof e === 'string' ? e : e.entity))
    .sort()
    .join('_');

  // Normalize ISO date format to YYYY-MM-DD for caching
  let normalizedStartDate = '';
  if (startDate) {
    try {
      if (startDate.includes('T')) {
        // It's an ISO date, extract just the date part
        normalizedStartDate = startDate.split('T')[0];
      } else {
        normalizedStartDate = startDate;
      }
    } catch {
      normalizedStartDate = startDate; // Fallback to original
    }
  }

  // Include the normalized startDate in the ID
  const startDatePart = normalizedStartDate ? `_${normalizedStartDate}` : '';

  // Create a base string with all data-affecting parameters
  const baseString = `calendar_${entityIds}_${daysToShow}_${showPastEvents ? 1 : 0}${startDatePart}`;

  // Hash it for a compact, consistent ID
  return hashString(baseString);
}

/**
 * Simple string hash function for creating deterministic IDs
 * Converts a string into a stable hash value for use as an identifier
 *
 * @param str - Input string to hash
 * @returns Alphanumeric hash string
 */
export function hashString(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  // Convert to alphanumeric string
  return Math.abs(hash).toString(36);
}

//-----------------------------------------------------------------------------
// LOCALE & FORMATTING UTILITIES
//-----------------------------------------------------------------------------

/**
 * Determines whether to use 24-hour time format based on Home Assistant settings
 *
 * This function examines Home Assistant locale settings to determine the
 * appropriate time format. It handles explicit settings (24h/12h), language-based
 * preferences, and system preferences by checking browser/OS settings.
 *
 * @param locale - Home Assistant locale object
 * @param fallbackTo24h - Whether to default to 24h format if detection fails
 * @returns Boolean indicating whether to use 24-hour format
 */
export function getTimeFormat24h(
  locale?: { time_format?: string; language?: string },
  fallbackTo24h: boolean = true,
): boolean {
  if (!locale) return fallbackTo24h;

  // Handle different time_format values
  if (locale.time_format === '24') {
    return true;
  } else if (locale.time_format === '12') {
    return false;
  } else if (locale.time_format === 'language' && locale.language) {
    // Use language to determine format
    return is24HourByLanguage(locale.language);
  } else if (locale.time_format === 'system') {
    // Handle 'system' setting by detecting browser/OS preference
    try {
      // Create a formatter without specifying hour12 option
      const formatter = new Intl.DateTimeFormat(navigator.language, {
        hour: 'numeric',
      });
      // Format afternoon time (13:00) and check if it has AM/PM markers
      const formattedTime = formatter.format(new Date(2000, 0, 1, 13, 0, 0));
      return !formattedTime.match(/AM|PM|am|pm/);
    } catch {
      // Default to language-based detection on error
      return locale.language ? is24HourByLanguage(locale.language) : fallbackTo24h;
    }
  }

  // Default to fallback value for other cases
  return fallbackTo24h;

  // Internal helper function for language-based detection
  function is24HourByLanguage(language: string): boolean {
    // Languages/locales that typically use 24h format
    const likely24hLanguages = [
      'de',
      'fr',
      'es',
      'it',
      'pt',
      'nl',
      'ru',
      'pl',
      'sv',
      'no',
      'fi',
      'da',
      'cs',
      'sk',
      'sl',
      'hr',
      'hu',
      'ro',
      'bg',
      'el',
      'tr',
      'zh',
      'ja',
      'ko',
    ];

    // Extract base language code (e.g., 'de-AT' -> 'de')
    const baseLanguage = language.split('-')[0].toLowerCase();

    return likely24hLanguages.includes(baseLanguage);
  }
}

/**
 * Formats a date according to Home Assistant locale settings
 *
 * @param date - Date to format
 * @param locale - Home Assistant locale object
 * @param fallbackFormat - Format to use if detection fails ('system' | 'YYYY-MM-DD')
 * @returns Formatted date string
 */
export function formatDateByLocale(
  date: Date,
  locale?: { date_format?: string; language?: string },
  fallbackFormat: 'system' | 'YYYY-MM-DD' = 'YYYY-MM-DD',
): string {
  if (!date || isNaN(date.getTime())) {
    return '';
  }

  // If no locale provided or format is explicitly set to YYYY-MM-DD
  if (!locale || locale.date_format === 'YYYY-MM-DD') {
    return formatDateAsYYYYMMDD(date);
  }

  try {
    // Use system locale if specified or no explicit format
    if (!locale.date_format || locale.date_format === 'system') {
      const localLanguage = locale.language || navigator.language;
      return new Intl.DateTimeFormat(localLanguage, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }).format(date);
    }

    // If language-based format is specified
    if (locale.date_format === 'language' && locale.language) {
      return new Intl.DateTimeFormat(locale.language, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }).format(date);
    }

    // Handle any custom formats (could be extended)
    if (locale.date_format === 'DD/MM/YYYY') {
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    }

    if (locale.date_format === 'MM/DD/YYYY') {
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${month}/${day}/${year}`;
    }
  } catch (error) {
    console.warn('Error formatting date:', error);
  }

  // Fallback to YYYY-MM-DD or system format
  return fallbackFormat === 'YYYY-MM-DD'
    ? formatDateAsYYYYMMDD(date)
    : new Intl.DateTimeFormat().format(date);
}

// Helper function for YYYY-MM-DD format
function formatDateAsYYYYMMDD(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Filter out default values from configuration
 * This helps avoid bloated YAML configuration by removing unnecessary properties
 *
 * @param config User configuration to filter
 * @param defaultConfig Default configuration to compare against
 * @returns Filtered configuration without default values
 */
export function filterDefaultValues(
  config: Record<string, unknown>,
  defaultConfig: Record<string, unknown>,
): Record<string, unknown> {
  // Skip filtering if config is not an object
  if (!config || typeof config !== 'object' || Array.isArray(config)) {
    return config;
  }

  // Make a copy of the config to avoid mutating the original
  const result = Array.isArray(config)
    ? ([] as unknown as Record<string, unknown>)
    : ({} as Record<string, unknown>);

  // Process each property in the config
  for (const [key, value] of Object.entries(config)) {
    // Skip undefined values
    if (value === undefined) {
      continue;
    }

    // Special handling for show_week_numbers to allow null value through
    if (key === 'show_week_numbers' && (value === null || value === '')) {
      continue; // Filter out both null and empty string values for show_week_numbers
    }

    // Special handling for entity arrays
    if (key === 'entities' && Array.isArray(value)) {
      result[key] = value;
      continue;
    }

    // Special handling for weather config - preserve entire structure once defined
    if (key === 'weather' && typeof value === 'object' && value !== null) {
      // Deep clone the weather config to preserve the full structure
      result[key] = structuredClone ? structuredClone(value) : JSON.parse(JSON.stringify(value));
      continue;
    }

    // Check if this is a default value
    const isDefaultValue = defaultConfig && key in defaultConfig && defaultConfig[key] === value;

    if (!isDefaultValue) {
      // For nested objects, recursively filter
      if (
        value !== null &&
        typeof value === 'object' &&
        !Array.isArray(value) &&
        defaultConfig &&
        typeof defaultConfig[key] === 'object' &&
        !Array.isArray(defaultConfig[key])
      ) {
        const nestedResult = filterDefaultValues(
          value as Record<string, unknown>,
          defaultConfig[key] as Record<string, unknown>,
        );

        // Only add the nested object if it has properties
        if (Object.keys(nestedResult).length > 0) {
          result[key] = nestedResult;
        }
      } else {
        // Otherwise add the value directly
        result[key] = value;
      }
    }
  }

  return result;
}
