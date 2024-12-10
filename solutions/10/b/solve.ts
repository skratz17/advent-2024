import { getTrimmedLines } from '../../../lib/utils/stringManip.ts';
import { isValidNextStep } from '../lib/domain.ts';

export default (fileData: string) => {
  const grid = getTrimmedLines(fileData);
  let score = 0;
  for(let i = 0; i < grid.length; i++) {
    for(let j = 0; j < grid[i].length; j++) {
      if(grid[i][j] === '0') {
        score += calculateTrailheadRating(grid, i, j);
      }
    }
  }
  return score;
};

const calculateTrailheadRating = (grid: string[], x: number, y: number) => {
  const currVal = grid[x][y];
  if(currVal === '9') return 1;

  const upScore = isValidNextStep(grid, x - 1, y, currVal) && calculateTrailheadRating(grid, x - 1, y) || 0;
  const rightScore = isValidNextStep(grid, x, y + 1, currVal) && calculateTrailheadRating(grid, x, y + 1) || 0;
  const downScore = isValidNextStep(grid, x + 1, y, currVal)  && calculateTrailheadRating(grid, x + 1, y) || 0;
  const leftScore = isValidNextStep(grid, x, y - 1, currVal) && calculateTrailheadRating(grid, x, y - 1) || 0;

  return upScore + rightScore + downScore + leftScore;
};