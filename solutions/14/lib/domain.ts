export type Dimensions = { rows: number, columns: number };

export const parseLine = (line: string) => {
  const [positionInfo, velocityInfo] = line.split(' ').map(val => val.substring(2));
  return {
    position: positionInfo.split(',').map(val => parseInt(val, 10)),
    velocity: velocityInfo.split(',').map(val => parseInt(val, 10)),
  };
};

export const calculateFinalPosition = (position: number[], velocity: number[], dimensions: Dimensions, seconds: number) => {
  const unadjustedFinalPositions = [ 
    (position[0] + (seconds * velocity[0])) % dimensions.columns,
    (position[1] + (seconds * velocity[1])) % dimensions.rows,
  ];

  return [
    unadjustedFinalPositions[0] < 0 ? dimensions.columns + unadjustedFinalPositions[0] : unadjustedFinalPositions[0],
    unadjustedFinalPositions[1] < 0 ? dimensions.rows + unadjustedFinalPositions[1] : unadjustedFinalPositions[1],
  ];
};