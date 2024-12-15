import { getTrimmedLines } from '../../../lib/utils/stringManip.ts';
type Direction = '^' | '>' | 'v' | '<';

export default (fileData: string) => {
  const lines = getTrimmedLines(fileData);
  const { grid, inputs } = parseLines(lines);
  let robotPosition = getRobotStartingPosition(grid);
  for(let i = 0; i < inputs.length; i++) {
    const nextCoords = move(grid, robotPosition, inputs[i] as Direction);
    robotPosition = nextCoords ?? robotPosition;
  }
  return scoreGrid(grid);
};

const parseLines = (lines: string[]) => {
  const grid: string[][] = [];
  let inputs = '';

  for(const line of lines) {
    if(line.startsWith('#')) {
      grid.push(line.split(''));
    } else {
      inputs += line;
    }
  }

  return { grid, inputs };
};

const getRobotStartingPosition = (grid: string[][]) => {
  for(let x = 0; x < grid.length; x++) {
    for(let y = 0; y < grid[x].length; y++) {
      if(grid[x][y] === '@') {
        return [ x, y ];
      }
    }
  }
};

const move = (grid: string[][], coords: number[], direction: Direction) => {
  const nextCoords = getNextCoord(coords, direction);
  const [ nextX, nextY ] = nextCoords;

  if(grid[nextX][nextY] === 'O') {
    move(grid, nextCoords, direction);
  }

  if(grid[nextX][nextY] === '.') {
    const [ x, y ] = coords;
    const char = grid[x][y];
    grid[nextX][nextY] = char;
    grid[x][y] = '.';
    return [ nextX, nextY ];
  } 
};

const getNextCoord = (coords: number[], direction: Direction) => {
  const [ x, y ] = coords;
  if(direction === '^') return [ x - 1, y ];
  else if(direction === '>') return [ x, y + 1 ];
  else if (direction === 'v') return [ x + 1, y ];
  else if (direction === '<') return [ x, y - 1 ];
};

const scoreGrid = (grid: string[][]) => {
  let score = 0;
  for(let x = 0; x < grid.length; x++) {
    for(let y = 0; y < grid[x].length; y++) {
      if(grid[x][y] === 'O') score += (100 * x) + y;
    }
  }
  return score;
};