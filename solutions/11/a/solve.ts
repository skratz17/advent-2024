import { getTrimmedLines } from '../../../lib/utils/stringManip.ts';
import { getNextRocks } from '../lib/domain.ts';

// keeping my naive part A solution for posterity, from a brighter day when we only blinked 25 times
export default (fileData: string) => {
  const lines = getTrimmedLines(fileData);
  let rocks = lines[0].split(' ');
  for(let i = 0; i < 25; i++) {
    rocks = blink(rocks);
  }
  return rocks.length;
};

const blink = (rocks: string[]) => {
  const newRocks = [];
  for(const rock of rocks) {
    newRocks.push(...getNextRocks(rock));
  }
  return newRocks;
};