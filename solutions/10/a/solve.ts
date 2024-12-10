import { getTrimmedLines } from '../../../lib/utils/stringManip.ts';
import { isValidNextStep } from '../lib/domain.ts';

export default (fileData: string) => {
  const grid = getTrimmedLines(fileData);
  let score = 0;
  for(let i = 0; i < grid.length; i++) {
    for(let j = 0; j < grid[i].length; j++) {
      if(grid[i][j] === '0') {
        score += calculateTrailheadScore(grid, i, j, new Set());
      }
    }
  }
  return score;
};

const calculateTrailheadScore = (grid: string[], x: number, y: number, visited: Set<string>) => {
  const currVal = grid[x][y];
  if(currVal === '9' && !visited.has(`${x},${y}`)) {
    visited.add(`${x},${y}`);
    return 1;
  }

  const upScore = isValidNextStep(grid, x - 1, y, currVal) && calculateTrailheadScore(grid, x - 1, y, visited) || 0;
  const rightScore = isValidNextStep(grid, x, y + 1, currVal) && calculateTrailheadScore(grid, x, y + 1, visited) || 0;
  const downScore = isValidNextStep(grid, x + 1, y, currVal)  && calculateTrailheadScore(grid, x + 1, y, visited) || 0;
  const leftScore = isValidNextStep(grid, x, y - 1, currVal) && calculateTrailheadScore(grid, x, y - 1, visited) || 0;

  return upScore + rightScore + downScore + leftScore;
};