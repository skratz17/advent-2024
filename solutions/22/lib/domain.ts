export const generateSecretNumber = (x: number) => {
  let newSecret = prune(mix(x * 64, x));
  newSecret = prune(mix(Math.floor(newSecret / 32), newSecret));
  newSecret = prune(mix(newSecret * 2048, newSecret));
  return newSecret;
};

const mix = (x: number, y: number) => {
  return (x ^ y) >>> 0;
};

const prune = (x: number) => {
  return x % 16777216;
};