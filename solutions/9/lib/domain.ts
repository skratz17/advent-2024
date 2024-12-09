export const getId = (index: number) => {
  return Math.floor(index / 2);
};

export const calculateChecksum = (fileSystem: number[]) => {
  let sum = 0;
  for(let i = 0; i < fileSystem.length; i++) {
    sum += (i * fileSystem[i]);
  }
  return sum;
};