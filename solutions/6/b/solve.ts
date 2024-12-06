import { getTrimmedLines } from '../../../lib/utils/stringManip.ts';
import { move, isOutOfGrid, getGuardStartingPosition } from '../lib/domain.ts';
type direction = '^' | '>' | 'v' | '<';

export default (fileData: string) => {
  const grid = getTrimmedLines(fileData).map(line => line.split(''));
  const { direction, coordinates } = getGuardStartingPosition(grid);
  let obstructionsAdded = 0;

  for(let x = 0; x < grid.length; x++) {
    for(let y = 0; y < grid[0].length; y++) {
      if(
        grid[x][y] === '.' &&
        checkIfObstructionCreatesCycle(grid, direction, coordinates, [ x, y ])
      ) {
        obstructionsAdded++;
      }
    }
  }

  return obstructionsAdded;
};

const checkIfObstructionCreatesCycle = (grid: string[][], startingDirection: direction, startingCoordinates: number[], obstructionCoordinates: number[]) => { 
  const visited = new Map<number, Map<number, Set<direction>>>();
  const originalCharacter = grid[obstructionCoordinates[0]][obstructionCoordinates[1]];
  grid[obstructionCoordinates[0]][obstructionCoordinates[1]] = '#';
  let direction = startingDirection;
  let coordinates = startingCoordinates;
  let isCycle = false;

  while(true) {
    const result = move(grid, direction, coordinates);
    coordinates = result.coordinates;
    direction = result.direction;

    if(isOutOfGrid(grid, coordinates)) {
      break;
    } else if(visited.get(coordinates[0])?.get(coordinates[1])?.has(direction)) {
      isCycle = true;
      break;
    } else {
      const yVisited = visited.get(coordinates[0]) || new Map<number, Set<direction>>();
      const directionSet = yVisited.get(coordinates[1]) || new Set<direction>();
      directionSet.add(direction);
      yVisited.set(coordinates[1], directionSet);
      visited.set(coordinates[0], yVisited);
    }
  }

  grid[obstructionCoordinates[0]][obstructionCoordinates[1]] = originalCharacter;
  return isCycle;
};