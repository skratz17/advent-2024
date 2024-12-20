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
  while(endScore - score >= 100) {
    visited.add(JSON.stringify(pointer));
    goodCheats += evaluateCheats(grid, gridScores, pointer, 100);
    pointer = move(grid, pointer, visited);
    score = gridScores.get(JSON.stringify(pointer));
  }
  return goodCheats;
};

const evaluateCheats = (grid: string[], gridScores: Map<string, number>, coord: number[], scoreThreshold: number) => {
  let goodCheats = 0;
  const coordScore = gridScores.get(JSON.stringify(coord));
  for(let xOffset = -20; xOffset <= 20; xOffset++) {
    for(const yOffset of getYOffsets(xOffset)) {
      const newCoord = [ coord[0] + xOffset, coord[1] + yOffset ];
      if(grid[newCoord[0]]?.[newCoord[1]] === '.' || grid[newCoord[0]]?.[newCoord[1]] === 'E') {
        const moves = Math.abs(xOffset) + Math.abs(yOffset);
        if(gridScores.get(JSON.stringify(newCoord)) - coordScore >= scoreThreshold + moves) {
          goodCheats++;
        }
      }
    }
  }
  return goodCheats;
};

const getYOffsets = (xOffset: number) => {
  const diff = 20 - Math.abs(xOffset);
  const yOffsets: number[] = [];
  for(let yOffset = 0 - diff; yOffset <= diff; yOffset++) {
    yOffsets.push(yOffset);
  }
  return yOffsets;
};