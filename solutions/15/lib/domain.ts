import type { ConsoleColor } from '../../../lib/config/colors.ts';
import { log } from '../../../lib/utils/log.ts';
import { sleep } from '../../../lib/utils/sleep.ts';

export type Direction = '^' | '>' | 'v' | '<';

export const getRobotStartingPosition = (grid: string[][]) => {
  for(let x = 0; x < grid.length; x++) {
    for(let y = 0; y < grid[x].length; y++) {
      if(grid[x][y] === '@') {
        return [ x, y ];
      }
    }
  }
};

export const getNextCoord = (coords: number[], direction: Direction) => {
  const [ x, y ] = coords;
  if(direction === '^') return [ x - 1, y ];
  else if(direction === '>') return [ x, y + 1 ];
  else if (direction === 'v') return [ x + 1, y ];
  else if (direction === '<') return [ x, y - 1 ];
};

export const printGrid = async (grid: string[][]) => {
  for(const line of grid) {
    for(const char of line) {
      let color: ConsoleColor | undefined;
      if(char === '@') color = 'GREEN';
      if(char === 'O' || char === '[' || char === ']') color = 'BLUE';
      if(char === '#') color = 'RED';
      log(char, color);
    }
    log('\n');
  }

  await sleep(150);
};