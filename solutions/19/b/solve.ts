import { getTrimmedLines } from '../../../lib/utils/stringManip.ts';

export default (fileData: string) => {
  const lines = getTrimmedLines(fileData);
  const colors = new Set(lines[0].split(',').map(x => x.trim()));
  const patterns = lines.slice(1);
  return patterns
    .map(pattern => {
      const lookup = countArrangements(pattern, colors);
      return lookup.get(pattern) || 0;
    })
    .reduce((acc, cur) => acc + cur, 0);
};

const countArrangements = (pattern: string, colors: Set<string>) => {
  const patternArrangements = new Map<string, number>();
  patternArrangements.set('', 1);

  for(let i = 0; i < pattern.length; i++) {
    const next = pattern[i];
    const prev = pattern.slice(0, i);
    let pointer = prev.length;
    let sum = 0;
    while(pointer >= 0) {
      const prevSub = prev.slice(0, pointer);
      const prevRemainder = prev.slice(pointer, prev.length) + next;
      if(patternArrangements.has(prevSub) && colors.has(prevRemainder)) {
        sum += patternArrangements.get(prevSub);
      }
      pointer--;
    }
    patternArrangements.set(prev + next, sum);
  }

  return patternArrangements;
};