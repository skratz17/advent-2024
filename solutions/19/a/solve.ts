import { getTrimmedLines } from '../../../lib/utils/stringManip.ts';

export default (fileData: string) => {
  const lines = getTrimmedLines(fileData);
  const colors = new Set(lines[0].split(',').map(x => x.trim()));
  const patterns = lines.slice(1);
  return patterns
    .filter(pattern => {
      return canMakePattern(pattern, colors, '');
    })
    .length;
};

const canMakePattern = (pattern: string, colors: Set<string>, currentPattern: string) => {
  if(currentPattern === pattern) {
    return true;
  } else if(currentPattern.length > pattern.length) {
    return false;
  }

  const checks: string[] = [];
  for(let i = 0; currentPattern.length + i < pattern.length; i++) {
    const check = pattern.slice(currentPattern.length, currentPattern.length + i + 1);
    if(colors.has(check)) {
      checks.push(check);
    }
  }

  return checks.some(check => canMakePattern(pattern, colors, currentPattern + check));
};
