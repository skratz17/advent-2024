const isInGrid = (grid: string[], x: number, y: number) => {
  return (
    x >= 0 &&
    x < grid.length &&
    y >= 0 &&
    y < grid[0].length
  );
};

export const isValidNextStep = (grid: string[], x: number, y: number, prev: string) => {
  return (
    isInGrid(grid, x, y) && 
    parseInt(grid[x][y], 10) - parseInt(prev, 10) === 1
  );
};