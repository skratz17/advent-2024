export const isInGrid = (grid: string[], coordinates: number[]) => {
  const [ x, y ] = coordinates;
  return (
    x >= 0 && 
    x < grid.length &&
    y >= 0 &&
    y < grid[0].length
  );
};