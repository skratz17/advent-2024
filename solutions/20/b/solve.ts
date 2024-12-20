import { getTrimmedLines } from '../../../lib/utils/stringManip.ts';
import { getStartAndEndPositions, move, scoreGrid } from '../lib/domain.ts';
type CheatParams = { scoreThreshold: number, maxCheatSteps: number };

export default (fileData: string) => {
  const grid = getTrimmedLines(fileData);
  const positions = getStartAndEndPositions(grid);
  const gridScores = scoreGrid(grid, positions.start);
  return scoreCheats(
    grid, 
    gridScores, 
    positions.start, 
    gridScores.get(JSON.stringify(positions.end)),
    { scoreThreshold: 100, maxCheatSteps: 20 }
  );
};

const scoreCheats = (
  grid: string[], 
  gridScores: Map<string, number>, 
  start: number[], 
  endScore: number,
  cheatParams: CheatParams
) => {
  let goodCheats = 0;
  let pointer = start;
  let score = gridScores.get(JSON.stringify(pointer));
  const visited = new Set<string>();
  while(endScore - score >= 100) {
    visited.add(JSON.stringify(pointer));
    goodCheats += evaluateCheats(grid, gridScores, pointer, cheatParams);
    pointer = move(grid, pointer, visited);
    score = gridScores.get(JSON.stringify(pointer));
  }
  return goodCheats;
};

const evaluateCheats = (
  grid: string[], 
  gridScores: Map<string, number>, 
  coord: number[], 
  params: CheatParams
) => {
  let goodCheats = 0;
  const coordScore = gridScores.get(JSON.stringify(coord));
  for(let xOffset = -params.maxCheatSteps; xOffset <= params.maxCheatSteps; xOffset++) {
    for(const yOffset of getYOffsets(xOffset, params.maxCheatSteps)) {
      const newCoord = [ coord[0] + xOffset, coord[1] + yOffset ];
      if(grid[newCoord[0]]?.[newCoord[1]] === '.' || grid[newCoord[0]]?.[newCoord[1]] === 'E') {
        const moves = Math.abs(xOffset) + Math.abs(yOffset);
        if(gridScores.get(JSON.stringify(newCoord)) - coordScore >= params.scoreThreshold + moves) {
          goodCheats++;
        }
      }
    }
  }
  return goodCheats;
};

const getYOffsets = (xOffset: number, maxCheatSteps: number) => {
  const diff = maxCheatSteps - Math.abs(xOffset);
  const yOffsets: number[] = [];
  for(let yOffset = 0 - diff; yOffset <= diff; yOffset++) {
    yOffsets.push(yOffset);
  }
  return yOffsets;
};