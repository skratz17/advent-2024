import { MUL_REGEX, evaluateMul } from '../lib/domain.ts';

export default async (fileData: string) => {
  let sum = 0;
  const matches = fileData.match(MUL_REGEX);
  for(const match of matches) {
    sum += evaluateMul(match);
  }
  return sum;
};
