// Map country status colors
export const COUNTRY_COLORS = {
  worked: "#60a5fa",      // Blue
  visited: "#4ade80",     // Green  
  experienced: "#f472b6", // Pink
  default: "#cbd5e1",     // Gray
} as const;

// Interactive state colors
export const INTERACTION_COLORS = {
  hover: "#F53",          // Red
  pressed: "#E42",        // Darker red
  stroke: "#222222",      // Dark gray
} as const;

// Color type for better type safety
export type CountryStatus = keyof typeof COUNTRY_COLORS;
