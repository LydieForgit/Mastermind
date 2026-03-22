// Define colors as a const array for type inference
export const COLORS = [
  'red',
  'green',
  'blue',
  'yellow',
  'orange',
  'purple',
] as const;

// Union type for colors (derived from the array)
export type Color = (typeof COLORS)[number];

// Type for feedback pegs in the check results
export type FeedbackPeg = 'red' | 'white' | '';

// Renamed for clarity (represents a single color peg)
export type ColorPeg = {
  color: Color;
};

export type Guess = {
  color: Color;
};
