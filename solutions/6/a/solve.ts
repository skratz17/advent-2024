import { getTrimmedLines } from '../../../lib/utils/stringManip.ts';
import { getGuardStartingPosition, move, isOutOfGrid } from '../lib/domain.ts';

export default (fileData: string) => {

  const grid = getTrimmedLines(fileData).map(line => line.split(''));
  let { direction, coordinates } = getGuardStartingPosition(grid);
  const visited = new Set<string>([ JSON.stringify(coordinates) ]);
  let moves = 1;

  while(true) {
    const result = move(grid, direction, coordinates);
    coordinates = result.coordinates;
    if(isOutOfGrid(grid, coordinates)) {
      break;
    }
    direction = result.direction;
    if(!visited.has(JSON.stringify(coordinates))) {
      moves += result.moves;
      visited.add(JSON.stringify(coordinates));
    }
  }

  return moves;
};