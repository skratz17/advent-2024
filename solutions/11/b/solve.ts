import { getTrimmedLines } from '../../../lib/utils/stringManip.ts';
import { getNextRocks } from '../lib/domain.ts';

export default (fileData: string) => {
  const lines = getTrimmedLines(fileData);
  let rocks = lines[0].split(' ');
  return countRocks(rocks, 75);
};

const countRocks = (rocks: string[], blinks: number) => {
  let count = 0;
  let rocksMap = getInitialRocksMap(rocks);
  for(let blink = 0; blink < blinks; blink++) {
    rocksMap = performBlink(rocksMap);
  }
  for(const rockCount of rocksMap.values()) {
    count += rockCount;
  }
  return count;
};

const getInitialRocksMap = (rocks: string[]) => {
  const rocksMap = new Map<string, number>();
  for(const rock of rocks) {
    if(!rocksMap.has(rock)) rocksMap.set(rock, 1);
    else rocksMap.set(rock, rocksMap.get(rock) + 1);
  }
  return rocksMap;
};

const performBlink = (rocksMap: Map<string, number>) => {
  const nextRocksMap = new Map<string, number>();
  for(const [rock, count] of rocksMap.entries()) {
    const nextRocks = getNextRocks(rock);
    for(const nextRock of nextRocks) {
      nextRocksMap.set(nextRock, nextRocksMap.has(nextRock) ? nextRocksMap.get(nextRock) + count : count);
    }
  }
  return nextRocksMap;
};