import { getTrimmedLines } from '../../../lib/utils/stringManip.ts';
import { calculateFinalPosition, parseLine } from '../lib/domain.ts';
import type { Dimensions } from '../lib/domain.ts';

export default (fileData: string) => {
  const lines = getTrimmedLines(fileData);
  const dimensions = { rows: 103, columns: 101 };
  const finalPositions = new Map<string, number>();
  for(const line of lines) {
    const { position, velocity } = parseLine(line);
    const finalPosition = calculateFinalPosition(position, velocity, dimensions, 100);
    addFinalPosition(finalPosition, finalPositions);
  }
  const quadrantCounts = countRobotsInQuadrants(finalPositions, dimensions);
  return quadrantCounts[0] * quadrantCounts[1] * quadrantCounts[2] * quadrantCounts[3];
};

const addFinalPosition = (finalPosition: number[], finalPositions: Map<string, number>) => {
  const key = JSON.stringify(finalPosition);
  let count = finalPositions.get(key) || 0;
  finalPositions.set(key, count + 1);
};

const countRobotsInQuadrants = (finalPositions: Map<string, number>, dimensions: Dimensions) => {
  const quadrantCounts: number[] = [0, 0, 0, 0];
  for(const key of finalPositions.keys()) {
    const finalPosition = JSON.parse(key) as number[];
    const quadrantCutoffColumn = dimensions.columns % 2 === 1 ? Math.floor(dimensions.columns / 2) : (dimensions.columns / 2) - 0.5;
    const quadrantCutoffRow = dimensions.rows % 2 === 1 ? Math.floor(dimensions.rows / 2) : (dimensions.rows / 2) - 0.5;
    if(finalPosition[0] < quadrantCutoffColumn && finalPosition[1] < quadrantCutoffRow) quadrantCounts[0] += finalPositions.get(key);
    if(finalPosition[0] > quadrantCutoffColumn && finalPosition[1] < quadrantCutoffRow) quadrantCounts[1] += finalPositions.get(key);
    if(finalPosition[0] < quadrantCutoffColumn && finalPosition[1] > quadrantCutoffRow) quadrantCounts[2] += finalPositions.get(key);
    if(finalPosition[0] > quadrantCutoffColumn && finalPosition[1] > quadrantCutoffRow) quadrantCounts[3] += finalPositions.get(key);
  }
  return quadrantCounts;
};