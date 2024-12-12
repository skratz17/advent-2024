import { getTrimmedLines } from '../../../lib/utils/stringManip.ts';
import { isInGrid } from '../../../lib/utils/grid.ts';
type Dimensions = { area: number, perimeter: number };

export default (fileData: string) => {
  const grid = getTrimmedLines(fileData);
  const visited = new Set<string>();
  let price = 0;
  for(let x = 0; x < grid.length; x++) {
    for(let y = 0; y < grid[x].length; y++) {
      if(!visited.has(`${x},${y}`)) {
        const dimensions = { area: 0, perimeter: 0 };
        calculate(grid, x, y, visited, dimensions);
        price += (dimensions.area * dimensions.perimeter);
      }
    }
  }
  return price;
};

const calculate = (grid: string[], x: number, y: number, visited: Set<string>, dimensions: Dimensions) => {
  const char = grid[x][y];
  dimensions.area++;
  visited.add(`${x},${y}`);

  const offsets = [ [ 0, 1 ], [ 0, -1 ], [ 1, 0 ], [ -1, 0 ] ];
  for(const offset of offsets) {
    const offsetX = x + offset[0];
    const offsetY = y + offset[1];
    if(
      isInGrid(grid, [ offsetX, offsetY ]) && 
      grid[offsetX][offsetY] === char &&
      !visited.has(`${offsetX},${offsetY}`)
    ) {
      calculate(grid, offsetX, offsetY, visited, dimensions);
    } else if(!isInGrid(grid, [ offsetX, offsetY ]) || grid[offsetX][offsetY] !== char) {
      dimensions.perimeter++;
    }
  }
};