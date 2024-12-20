export const getStartAndEndPositions = (grid: string[]) => {
  const positions: { start: number[], end: number[] } = { start: [], end: [] };
  for(let x = 0; x < grid.length; x++) {
    for(let y = 0; y < grid[x].length; y++) {
      if(grid[x][y] === 'S') positions.start = [ x, y ];
      if(grid[x][y] === 'E') positions.end = [ x, y ];
    }
  }
  return positions;
};

export const scoreGrid = (grid: string[], start: number[]) => {
  const gridScores: Map<string, number> = new Map();
  const visited = new Set<string>();
  let pointer = start;
  let score = 0;
  while(true) {
    gridScores.set(JSON.stringify(pointer), score);
    visited.add(JSON.stringify(pointer));
    pointer = move(grid, pointer, visited);
    score++;
    if(grid[pointer[0]]?.[pointer[1]] === 'E') {
      gridScores.set(JSON.stringify(pointer), score);
      break;
    }
  }
  return gridScores;
};

export const move = (grid: string[], coord: number[], visited: Set<string>) => {
  const moves = [[1,0], [-1,0], [0,1], [0,-1]];
  for(const move of moves) {
    const newCoord = [ coord[0] + move[0], coord[1] + move[1] ];
    if(!visited.has(JSON.stringify(newCoord)) && (grid[newCoord[0]]?.[newCoord[1]] === '.' || grid[newCoord[0]]?.[newCoord[1]] === 'E')) {
      return newCoord;
    }
  }
};