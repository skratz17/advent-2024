import { isInGrid } from '../../../lib/utils/grid.ts';
import { getTrimmedLines } from '../../../lib/utils/stringManip.ts';
type Direction = 'N' | 'E' | 'S' | 'W';

const DIRECTIONS_ORDER: Record<Direction, Array<{direction: Direction, increment: number}>> = {
  'N': [ { direction: 'N', increment: 0 }, { direction: 'E', increment: 1000 }, { direction: 'W', increment: 1000 }, { direction: 'S', increment: 2000 } ],
  'E': [ { direction: 'N', increment: 1000 }, { direction: 'E', increment: 0 }, { direction: 'W', increment: 2000 }, { direction: 'S', increment: 1000 } ],
  'S': [ { direction: 'N', increment: 2000 }, { direction: 'E', increment: 1000 }, { direction: 'W', increment: 1000 }, { direction: 'S', increment: 0 } ],
  'W': [ { direction: 'N', increment: 1000 }, { direction: 'E', increment: 2000 }, { direction: 'W', increment: 0 }, { direction: 'S', increment: 1000 } ],
};

const DIRECTION_OFFSETS: Record<Direction, number[]> = {
  'N': [ -1, 0 ],
  'E': [ 0, 1 ],
  'S': [ 1, 0 ],
  'W': [ 0, -1 ],
};

export default (fileData: string) => {
  const grid = getTrimmedLines(fileData);
  const positions = findStartAndEnd(grid);
  const scores = new Map<string, number>();
  evaluate(grid, positions.start, 'E', 0, scores);
  return scores.get(JSON.stringify(positions.end));
};

const findStartAndEnd = (grid: string[]) => {
  const positions: { start: number[], end: number[] } = { start: [], end: [] };
  for(let x = 0; x < grid.length; x++) {
    for(let y = 0; y < grid[x].length; y++) {
      if(grid[x][y] === 'S') positions.start = [ x, y ];
      if(grid[x][y] === 'E') positions.end = [ x, y ];
    }
  }
  return positions;
};

const evaluate = (grid: string[], coord: number[], direction: Direction, score: number, scores: Map<string, number>) => {
  scores.set(JSON.stringify(coord), score);
  const directions = DIRECTIONS_ORDER[direction];
  for(const directionToMove of directions) {
    const nextCoord = getNextCell(grid, coord, directionToMove.direction);
    const prospectiveScore = score + 1 + directionToMove.increment;
    if(
      nextCoord && 
      grid[nextCoord[0]][nextCoord[1]] !== '#' &&
      shouldTravelToCoord(nextCoord, scores, prospectiveScore)
    ) {
      evaluate(grid, nextCoord, directionToMove.direction, prospectiveScore, scores);
    }
  }
};

const getNextCell = (grid: string[], coord: number[], direction: Direction) => {
  const directionOffset = DIRECTION_OFFSETS[direction];
  const nextCoord = [ coord[0] + directionOffset[0], coord[1] + directionOffset[1] ];
  if(isInGrid(grid, nextCoord)) return nextCoord;
  else return null;
};

const shouldTravelToCoord = (coord: number[], scores: Map<string, number>, score: number) => {
  const bestScoreAtCoord = scores.get(JSON.stringify(coord));
  return bestScoreAtCoord === undefined || bestScoreAtCoord > score;
};