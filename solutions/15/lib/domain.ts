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