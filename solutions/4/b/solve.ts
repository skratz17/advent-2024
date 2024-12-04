import { getTrimmedLines } from '../../../lib/utils/stringManip.ts';
import { WordBuilder } from '../lib/WordBuilder.ts';

export default async (fileData: string) => {
  let xmasInstances = 0;
  const grid = getTrimmedLines(fileData);

  for(let x = 0; x < grid.length; x++) {
    for(let y = 0; y < grid[x].length; y++) {
      if(grid[x][y] === 'A' && isXmasAtCoordinate(grid, x, y)) {
        xmasInstances++;
      }
    }
  }

  return xmasInstances;
};

const isXmasAtCoordinate = (grid: string[], x: number, y: number) => {
  const firstSlash = new WordBuilder(grid, x - 1, y - 1).navigate(1, 1).navigate(1, 1).getWord();
  const secondSlash = new WordBuilder(grid, x - 1, y + 1).navigate(1, -1).navigate(1, -1).getWord();

  return (
    (firstSlash === 'MAS' || firstSlash === 'SAM') &&
    (secondSlash === 'MAS' || secondSlash === 'SAM')
  );
};