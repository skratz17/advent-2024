import { getTrimmedLines } from '../../../lib/utils/stringManip.ts';
import { addAntinode, getAntennaCoordinates, isInGrid } from '../lib/domain.ts';

export default (fileData: string) => {
  const grid = getTrimmedLines(fileData);
  const antennaCoordinates = getAntennaCoordinates(grid);
  const uniqueAntinodes = new Set<string>();
  for(const [ antenna, coordinates ] of antennaCoordinates) {
    for(let i = 0; i < coordinates.length - 1; i++) {
      for(let j = i + 1; j< coordinates.length; j++) {
        const coordA = coordinates[i];
        const coordB = coordinates[j];
        addAntinode(uniqueAntinodes, coordA);
        addAntinode(uniqueAntinodes, coordB);
        const diff = [ coordB[0] - coordA[0], coordB[1] - coordA[1] ];
        for(let x = coordB[0], y = coordB[1]; isInGrid(grid, [ x, y ]); x += diff[0], y += diff[1]) {
          addAntinode(uniqueAntinodes, [ x, y ]);
        }
        for(let x = coordA[0], y = coordA[1]; isInGrid(grid, [ x, y ]); x -= diff[0], y -= diff[1]) {
          addAntinode(uniqueAntinodes, [ x, y ]);
        }
      }
    }
  }
  return uniqueAntinodes.size;
};