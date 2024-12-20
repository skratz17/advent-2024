import { getTrimmedLines } from '../../../lib/utils/stringManip.ts';
import { getStartAndEndPositions, move, scoreGrid } from '../lib/domain.ts';

export default (fileData: string) => {
  const grid = getTrimmedLines(fileData);
  const positions = getStartAndEndPositions(grid);
  const gridScores = scoreGrid(grid, positions.start);
  return scoreCheats(grid, gridScores, positions.start, gridScores.get(JSON.stringify(positions.end)));
};

const scoreCheats = (grid: string[], gridScores: Map<string, number>, start: number[], endScore: number) => {
  let goodCheats = 0;
  let pointer = start;
  let score = gridScores.get(JSON.stringify(pointer));
  const visited = new Set<string>();
  while(endScore - score >= 102) {
    visited.add(JSON.stringify(pointer));
    goodCheats += evaluateCheats(grid, gridScores, pointer);
    pointer = move(grid, pointer, visited);
    score = gridScores.get(JSON.stringify(pointer));
  }
  return goodCheats;
};

// evaluateCheats in part b solution is more generalized version of this
// keeping original implementation for posterity
const evaluateCheats = (grid: string[], gridScores: Map<string, number>, coord: number[]) => {
  let goodCheats = 0;
  const coordScore = gridScores.get(JSON.stringify(coord));
  const cheats = [
    [-2,0],
    [2,0],
    [0,-2],
    [0,2],
    [1,1],
    [1,-1],
    [-1,1],
    [-1,-1],
  ];
  for(const cheat of cheats) {
    const newCoord = [ coord[0] + cheat[0], coord[1] + cheat[1] ];
    if(grid[newCoord[0]]?.[newCoord[1]] === '.' || grid[newCoord[0]]?.[newCoord[1]] === 'E') {
      if(gridScores.get(JSON.stringify(newCoord)) - coordScore >= 102) {
        goodCheats++;
      }
    }
  }
  return goodCheats;
};