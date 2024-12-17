import { MinHeap } from '../../../lib/ds/MinHeap.ts';
import { isInGrid } from '../../../lib/utils/grid.ts';
import { getTrimmedLines } from '../../../lib/utils/stringManip.ts';
type Direction = 'N' | 'E' | 'S' | 'W';
type Cell = { coord: number[], direction: Direction };

const DIRECTIONS_ORDER: Record<Direction, Array<{direction: Direction, increment: number}>> = {
  'N': [ { direction: 'N', increment: 0 }, { direction: 'E', increment: 1000 }, { direction: 'W', increment: 1000 }, { direction: 'S', increment: 2000 } ],
  'E': [ { direction: 'N', increment: 1000 }, { direction: 'E', increment: 0 }, { direction: 'W', increment: 2000 }, { direction: 'S', increment: 1000 } ],
  'S': [ { direction: 'N', increment: 2000 }, { direction: 'E', increment: 1000 }, { direction: 'W', increment: 1000 }, { direction: 'S', increment: 0 } ],
  'W': [ { direction: 'N', increment: 1000 }, { direction: 'E', increment: 2000 }, { direction: 'W', increment: 0 }, { direction: 'S', increment: 1000 } ],
};

const DIRECTION_OFFSETS: Record<Direction, number[]> = {
  'N': [ -1, 0 ],
  'E': [ 0, 1 ],
  'S': [ 1, 0 ],
  'W': [ 0, -1 ],
};

export default (fileData: string) => {
  const grid = getTrimmedLines(fileData);
  const positions = findStartAndEnd(grid);
  const scores = new Map<string, number>();
  const prev = new Map<string, Set<string>>();
  const queue = new MinHeap<Cell>();
  const startKey = JSON.stringify(positions.start) + 'E';
  scores.set(startKey, 0);
  queue.insert({ 
    key: startKey,
    data: {
      coord: positions.start,
      direction: 'E',
    },
    value: 0,
  });
  while(queue.size() > 0) {
    const lowest = queue.removeMin();
    if(scores.get(lowest.key) < lowest.value) continue;
    const { data: { coord, direction } } = lowest;
    const nextCell = getNextCell(grid, coord, direction);
    const nextKey = JSON.stringify(nextCell) + direction;
    if(nextCell && grid[nextCell[0]][nextCell[1]] !== '#') {
      const score = scores.get(lowest.key) + 1;
      if(!scores.has(nextKey) || score <= scores.get(nextKey)) {
        const prevSet = prev.get(nextKey) || new Set<string>();
        prevSet.add(lowest.key);
        prev.set(nextKey, prevSet);
      }
      if(!scores.has(nextKey) || score < scores.get(nextKey)) {
        scores.set(nextKey, score);
        queue.insert({
          key: nextKey,
          data: {
            coord: nextCell,
            direction: direction,
          },
          value: score,
        });
      }
    }
    const turns: Record<Direction, Direction[]> = {
      'E': [ 'N', 'S' ],
      'N': [ 'W', 'E' ],
      'S': [ 'W', 'E' ],
      'W': [ 'N', 'S' ],
    };
    for(const turn of turns[direction]) {
      const nextKey = JSON.stringify(coord) + turn;
      const score = scores.get(lowest.key) + 1000;
      if(!scores.has(nextKey) || score <= scores.get(nextKey)) {
        const prevSet = prev.get(nextKey) || new Set<string>();
        prevSet.add(lowest.key);
        prev.set(nextKey, prevSet);
      }
      if(!scores.has(nextKey) || score < scores.get(nextKey)) {
        scores.set(nextKey, score);
        queue.insert({
          key: nextKey,
          data: {
            coord: coord,
            direction: turn,
          },
          value: score,
        });
      }
    }
  }
  let bestScore: number | undefined;
  const visited = new Set<string>([ JSON.stringify(positions.end) ]);
  for(const direction of Object.keys(DIRECTIONS_ORDER) as Direction[]) {
    if(scores.has(JSON.stringify(positions.end) + direction)) {
      const score = scores.get(JSON.stringify(positions.end) + direction);
      bestScore = bestScore === undefined || score < bestScore ? score : bestScore;
    }
  }
  for(const direction of Object.keys(DIRECTIONS_ORDER) as Direction[]) {
    if(scores.get(JSON.stringify(positions.end) + direction) === bestScore) {
      let toVisit = [ JSON.stringify(positions.end) + direction ];
      while(toVisit.length) {
        const nextVisit = toVisit.shift();
        const currentScore = scores.get(nextVisit);
        if(!visited.has(nextVisit)) {
          visited.add(nextVisit);
          const prevs = prev.get(nextVisit);
          if(prevs) {
            const realPrevs = [ ...prevs ].filter(m => scores.get(m) < currentScore);
            toVisit = toVisit.concat(realPrevs);
          }
        }
      }
    }
  }
  const trueVisit = new Set<string>();
  for(const val of visited.values()) {
    if(!val.endsWith(']')) trueVisit.add(val.slice(0, val.length - 1));
    else trueVisit.add(val);
  }
  printVisit(grid, trueVisit)
  return trueVisit.size;
};

const printVisit = (grid: string[], visit: Set<string>) => {
  for(let x = 0; x < grid.length; x++){
    let line = '';
    for(let y = 0; y < grid[x].length; y++) {
      if(visit.has(JSON.stringify([x,y]))) line += 'O';
      else line += grid[x][y];
    }
  }
};

const findStartAndEnd = (grid: string[]) => {
  const positions: { start: number[], end: number[] } = { start: [], end: [] };
  for(let x = 0; x < grid.length; x++) {
    for(let y = 0; y < grid[x].length; y++) {
      if(grid[x][y] === 'S') positions.start = [ x, y ];
      if(grid[x][y] === 'E') positions.end = [ x, y ];
    }
  }
  return positions;
};

const getNextCell = (grid: string[], coord: number[], direction: Direction) => {
  const directionOffset = DIRECTION_OFFSETS[direction];
  const nextCoord = [ coord[0] + directionOffset[0], coord[1] + directionOffset[1] ];
  if(isInGrid(grid, nextCoord)) return nextCoord;
  else return null;
};