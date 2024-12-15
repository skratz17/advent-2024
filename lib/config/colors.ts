export type ConsoleColor = 'GREEN' | 'RED' | 'BLUE' | 'CYAN' | 'WHITE' | 'BLACK';
export const RESET_COLOR = '\x1b[0m';

// https://stackoverflow.com/a/41407246
export const FOREGROUND_COLORS: Record<ConsoleColor, string> = {
  'GREEN': '\x1b[32m',
  'RED': '\x1b[31m',
  'BLUE': '\x1b[34m',
  'CYAN': '\x1b[36m',
  'WHITE': '\x1b[37m',
  'BLACK': '\x1b[30m',
};

export const BACKGROUND_COLORS: Record<ConsoleColor, string> = { 
  'GREEN': '\x1b[42m',
  'RED': '\x1b[41m',
  'BLUE': '\x1b[44m',
  'CYAN': '\x1b[46m',
  'WHITE': '\x1b[47m',
  'BLACK': '\x1b[40m',
};