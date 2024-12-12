import { getTrimmedLines } from '../../../lib/utils/stringManip.ts';
import { isInGrid } from '../../../lib/utils/grid.ts';
type Dimensions = { area: number };

export default (fileData: string) => {
  const grid = getTrimmedLines(fileData);
  const visited = new Set<string>();
  let price = 0;
  for(let x = 0; x < grid.length; x++) {
    for(let y = 0; y < grid[x].length; y++) {
      if(!visited.has(`${x},${y}`)) {
        const sides = new Set<string>();
        const dimensions = { area: 0, perimeter: 0 };
        calculate(grid, x, y, visited, dimensions, sides);
        const sidesCount = calculateSides(sides);
        price += (dimensions.area * sidesCount);
      }
    }
  }
  return price;
};

const calculateSides = (fences: Set<string>) => {
  const coords: number[][] = [];
  let sides = 0;
  for(const fence of fences.values()) coords.push(fence.split(',').map(val => parseInt(val, 10)));
  while(coords.length > 0) {
    let coord = coords.pop();
    sides++;
    const side = [ coord ];
    while(true) {
      const nextCoordIndex = coords.findIndex(checkCoord => {
        return (
          side.some(coord => (checkCoord[0] === coord[0] && checkCoord[1] === coord[1] + 1 && checkCoord[2] === coord[2] && checkCoord[3] === coord[3])) ||
          side.some(coord => (checkCoord[0] === coord[0] && checkCoord[1] === coord[1] - 1  && checkCoord[2] === coord[2]  && checkCoord[3] === coord[3])) ||
          side.some(coord => (checkCoord[0] === coord[0] + 1 && checkCoord[1] === coord[1]  && checkCoord[2] === coord[2]  && checkCoord[3] === coord[3])) ||
          side.some(coord => (checkCoord[0] === coord[0] - 1 && checkCoord[1] === coord[1]  && checkCoord[2] === coord[2]  && checkCoord[3] === coord[3]))
        );
      });
      if(nextCoordIndex === -1) break;
      const nextCoord = coords[nextCoordIndex];
      coords.splice(nextCoordIndex, 1);
      side.push(nextCoord);
      coord = nextCoord;
    }
  }
  return sides;
};

const calculate = (grid: string[], x: number, y: number, visited: Set<string>, dimensions: Dimensions, sides: Set<string>) => {
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
      calculate(grid, offsetX, offsetY, visited, dimensions, sides);
    } else if(!isInGrid(grid, [ offsetX, offsetY ]) || grid[offsetX][offsetY] !== char) {
      sides.add(`${offsetX},${offsetY},${offset[0]},${offset[1]}`);
    }
  }
};