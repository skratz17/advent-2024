import { sleep } from '../../../lib/utils/sleep.ts';
import { getTrimmedLines } from '../../../lib/utils/stringManip.ts';
import { calculateFinalPosition, parseLine } from '../lib/domain.ts';
import type { Dimensions } from '../lib/domain.ts';

export default async (fileData: string) => {
  const lines = getTrimmedLines(fileData);
  const dimensions = { rows: 103, columns: 101 };
  let seconds = 7055;
  while(true) {
    const positions = new Set<string>();
    for(const line of lines) {
      const { position, velocity } = parseLine(line);
      const finalPosition = calculateFinalPosition(position, velocity, dimensions, seconds);
      positions.add(`${finalPosition[0]},${finalPosition[1]}`);
    }
    printPositions(positions, seconds, dimensions);
    await sleep(250);
    seconds += dimensions.rows;
  }
};

const printPositions = async (positions: Set<string>, seconds: number, dimensions: Dimensions) => {
  const grid: string[] = [];
  for(let i = 0; i < dimensions.columns; i++) {
    for(let j = 0; j < dimensions.rows; j++) {
      if(!grid[j]) grid[j] = '';
      grid[j] += positions.has(`${i},${j}`) ? 'O' : '.';
    }
  }
  console.log(`******** SECONDS (${seconds}) **********`);
  for(const line of grid) {
    console.log(line);
  }
  console.log('\n');
};