import { getTrimmedLines } from '../../../lib/utils/stringManip.ts';
import { getAntennaCoordinates, isInGrid } from '../lib/domain.ts';

export default (fileData: string) => {
  const grid = getTrimmedLines(fileData);
  const antennaCoordinates = getAntennaCoordinates(grid);
  const uniqueAntinodes = new Set<string>();
  for(const [ antenna, coordinates ] of antennaCoordinates) {
    for(let i = 0; i < coordinates.length - 1; i++) {
      for(let j = i + 1; j < coordinates.length; j++) {
        const coordA = coordinates[i];
        const coordB = coordinates[j];
        const diff = [ coordB[0] - coordA[0], coordB[1] - coordA[1] ];
        const antinodePos1 = [ coordB[0] + diff[0], coordB[1] + diff[1] ];
        const antinodePos2 = [ coordA[0] - diff[0], coordA[1] - diff[1] ];
        if(isInGrid(grid, antinodePos1)) uniqueAntinodes.add(JSON.stringify(antinodePos1));
        if(isInGrid(grid, antinodePos2)) uniqueAntinodes.add(JSON.stringify(antinodePos2));
      }
    }
  }
  return uniqueAntinodes.size;
};
