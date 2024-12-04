import { getTrimmedLines } from '../../../lib/utils/stringManip.ts';
import { WordBuilder } from '../lib/WordBuilder.ts';

export default async (fileData: string) => {
  let xmasInstances = 0;
  const grid = getTrimmedLines(fileData);
  for(let x = 0; x < grid.length; x++) {
    for(let y = 0; y < grid[x].length; y++) {
      if(grid[x][y] === 'X') {
        xmasInstances += countXmasInstancesAtCoordinate(grid, x, y);
      }
    }
  }
  return xmasInstances;
};

const countXmasInstancesAtCoordinate = (grid: string[], x: number, y: number) => {
  let xmasInstances = 0;

  for(let xOffset = -1; xOffset <= 1; xOffset++) {
    for(let yOffset = -1; yOffset <= 1; yOffset++) {
      const check = new WordBuilder(grid, x, y);
      for(let i = 0; i < 3; i++) {
        check.navigate(xOffset, yOffset);
      }
      if(check.getWord() === 'XMAS') xmasInstances++;
    }
  }

  return xmasInstances;
};
