export const getAntennaCoordinates = (grid: string[]) => {
  const coordinates = new Map<string, number[][]>();
  for(let x = 0; x < grid.length; x++) {
    for(let y = 0; y < grid[x].length; y++) {
      if(/[A-Za-z0-9]/.test(grid[x][y])) {
        const antenna = grid[x][y];
        const antennaCoordinates = coordinates.get(antenna) ?? [];
        antennaCoordinates.push([ x, y ]);
        coordinates.set(antenna, antennaCoordinates);
      }
    }
  }
  return coordinates;
};

export const isInGrid = (grid: string[], coordinates: number[]) => {
  const [ x, y ] = coordinates;
  return (
    x >= 0 && 
    x < grid.length &&
    y >= 0 &&
    y < grid[0].length
  );
}

export const addAntinode = (set: Set<string>, coordinates: number[]) => {
  return set.add(JSON.stringify(coordinates));
};