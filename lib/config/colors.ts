export type ConsoleColor = 'GREEN' | 'RED' | 'BLUE' | 'RESET';

// https://stackoverflow.com/a/41407246
export const CONSOLE_COLORS: Record<ConsoleColor, string> = {
  'GREEN': '\x1b[32m',
  'RED': '\x1b[31m',
  'BLUE': '\x1b[36m',
  'RESET': '\x1b[0m',
}