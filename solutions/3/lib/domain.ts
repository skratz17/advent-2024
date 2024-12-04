export const MUL_REGEX = /mul\([0-9]{1,3},[0-9]{1,3}\)/g;

export const evaluateMul = (mul: string) => {
  const nums = mul
    .slice(4, -1)
    .split(',')
    .map(num => parseInt(num, 10));
  return nums[0] * nums[1];
};