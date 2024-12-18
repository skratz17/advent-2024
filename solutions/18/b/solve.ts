import { getTrimmedLines } from '../../../lib/utils/stringManip.ts';

export default (fileData: string) => {
  const bytes = getTrimmedLines(fileData);
  const obstaclesArr = bytes.map(byte => JSON.stringify(byte.split(',').map(x => parseInt(x, 10))));
  const obstacles = new Set<string>(obstaclesArr.slice(0, 1024));
  for(let i = 1024; i < obstaclesArr.length; i++) {
    console.log('BYTE #', i);
    obstacles.add(obstaclesArr[i]);
    const scores = new Map<string, number>();
    travel([0, 0], scores, obstacles, 0);
    if(!scores.has('[70,70]')) {
      return obstaclesArr[i];
    }
  }
};

const travel = (coord: number[], scores: Map<string, number>, obstacles: Set<string>, score: number) => {
  scores.set(JSON.stringify(coord), score);
  const offsets =  [[0, 1], [0, -1], [1, 0], [-1, 0]];
  for(const offset of offsets) {
    const newCoord = [ coord[0] + offset[0], coord[1] + offset[1] ];
    if(
      newCoord[0] >= 0 && 
      newCoord[0] <= 70 && 
      newCoord[1] >= 0 && 
      newCoord[1] <= 70 && 
      shouldTravelToCoord(newCoord, score + 1, scores, obstacles)
    ) {
      travel(newCoord, scores, obstacles, score + 1);
    }
  }
};

const shouldTravelToCoord = (coord: number[], score: number, scores: Map<string, number>, obstacles: Set<string>) => {
  const key = JSON.stringify(coord);
  return !obstacles.has(key) && (!scores.has(key) || scores.get(key) > score);
};