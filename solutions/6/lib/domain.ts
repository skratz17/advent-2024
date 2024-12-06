type direction = '^' | '>' | 'v' | '<';

export const MOVES: Record<direction, number[]> = {
  '^': [-1, 0],
  '>': [0, 1],
  'v': [1, 0],
  '<': [0, -1],
};

export const TRANSITIONS: Record<direction, direction> = {
  '^': '>',
  '>': 'v',
  'v': '<',
  '<': '^',
};

export const getGuardStartingPosition = (grid: string[][]) => {
  for(let x = 0; x < grid.length; x++) {
    const match = /[>^<v]/.exec(grid[x].join(''));
    if(match !== null) {
      return {
        direction: match[0] as direction,
        coordinates: [ x, match.index ],
      };
    }
  }
};

export const move = (grid: string[][], direction: direction, coordinates: number[]) => {
  const nextMove = MOVES[direction];
  const nextCell = [ coordinates[0] + nextMove[0], coordinates[1] + nextMove[1] ];
  if(grid[nextCell[0]]?.[nextCell[1]] === '#') {
    return {
      coordinates: coordinates,
      direction: TRANSITIONS[direction],
      moves: 0,
    };
  } else {
    return {
      coordinates: nextCell,
      direction: direction,
      moves: 1,
    };
  }
};

export const isOutOfGrid = (grid: string[][], coordinates: number[]) => {
  return (
    coordinates[0] < 0 || 
    coordinates[0] >= grid.length ||
    coordinates[1] < 0 ||
    coordinates[1] >= grid[0].length
  );
};