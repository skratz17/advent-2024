import { sleep } from '../../../lib/utils/sleep.ts';
import { getTrimmedLines } from '../../../lib/utils/stringManip.ts';
import { getNextCoord, getRobotStartingPosition, printGrid } from '../lib/domain.ts';
import type { Direction } from '../lib/domain.ts';

export default async (fileData: string) => {
  const lines = getTrimmedLines(fileData);
  const { grid, inputs } = parseLines(lines);
  let robotPosition = getRobotStartingPosition(grid);
  for(let i = 0; i < inputs.length; i++) {
    await printGrid(grid, inputs[i] as Direction);
    const nextCoords = move(grid, robotPosition, inputs[i] as Direction);
    robotPosition = nextCoords ?? robotPosition;
  }
  await printGrid(grid, '@');
  return scoreGrid(grid);
};

const parseLines = (lines: string[]) => {
  const grid: string[][] = [];
  let inputs = '';

  for(const line of lines) {
    if(line.startsWith('#')) {
      const chars = [];
      for(const char of line) {
        if(char === '#') chars.push('#', '#');
        else if(char === 'O') chars.push('[', ']');
        else if(char === '.') chars.push('.', '.');
        else if(char === '@') chars.push('@', '.');
      }
      grid.push(chars);
    } else {
      inputs += line;
    }
  }

  return { grid, inputs };
};

const move = (grid: string[][], coords: number[], direction: Direction) => {
  const nextCoords = getNextCoord(coords, direction);
  const [ nextX, nextY ] = nextCoords;

  if(grid[nextX][nextY] === '[' || grid[nextX][nextY] === ']') {
    if(direction === '^' || direction === 'v') {
      const gridCopy = copyGrid(grid);
      if(grid[nextX][nextY] === '[') {
        if(!move(grid, nextCoords, direction) || !move(grid, [nextX, nextY + 1], direction)) {
          renewGrid(gridCopy, grid);
        }
      } else {
        if(!move(grid, nextCoords, direction) || !move(grid, [nextX, nextY - 1], direction)) {
          renewGrid(gridCopy, grid);
        }
      }
    } else {
      move(grid, nextCoords, direction);
    }
  }

  if(grid[nextX][nextY] === '.') {
    const [ x, y ] = coords;
    const char = grid[x][y];
    grid[nextX][nextY] = char;
    grid[x][y] = '.';
    return [ nextX, nextY ];
  } 
};

const copyGrid = (grid: string[][]) => {
  const copiedGrid = [];
  for(const line of grid) {
    const copiedLine = [];
    for(const char of line) {
      copiedLine.push(char);
    }
    copiedGrid.push(copiedLine);
  }
  return copiedGrid;
};

const renewGrid = (source: string[][], toOverwrite: string[][]) => {
  for(let x = 0; x < source.length; x++) {
    for(let y = 0; y < source[x].length; y++) {
      toOverwrite[x][y] = source[x][y];
    }
  }
};

const scoreGrid = (grid: string[][]) => {
  let score = 0;
  for(let x = 0; x < grid.length; x++) {
    for(let y = 0; y < grid[x].length; y++) {
      if(grid[x][y] === '[') score += (100 * x) + y;
    }
  }
  return score;
};