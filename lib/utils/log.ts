import { CONSOLE_COLORS } from '../config/colors.ts';
import type { ConsoleColor } from '../config/colors.ts';

export const log = (text: string, color?: ConsoleColor) => {
  if(color) process.stdout.write(CONSOLE_COLORS[color]);
  process.stdout.write(text);
  if(color) process.stdout.write(CONSOLE_COLORS['RESET']);
};