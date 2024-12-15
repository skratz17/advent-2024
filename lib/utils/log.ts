import { BACKGROUND_COLORS, FOREGROUND_COLORS, RESET_COLOR } from '../config/colors.ts';
import type { ConsoleColor } from '../config/colors.ts';

export const log = (text: string, foregroundColor?: ConsoleColor, backgroundColor?: ConsoleColor) => {
  if(foregroundColor) process.stdout.write(FOREGROUND_COLORS[foregroundColor]);
  if(backgroundColor) process.stdout.write(BACKGROUND_COLORS[backgroundColor]);
  process.stdout.write(text);
  if(foregroundColor || backgroundColor) process.stdout.write(RESET_COLOR);
};