import { getTrimmedLines } from '../../../lib/utils/stringManip.ts';
import { generateSecretNumber } from '../lib/domain.ts';

export default (fileData: string) => {
  const secretNumbers = getTrimmedLines(fileData).map(x => parseInt(x, 10));
  let sum = 0;
  for(const secretNumber of secretNumbers) {
    let newSecret = secretNumber;
    for(let i = 0; i < 2000; i++) {
      newSecret = generateSecretNumber(newSecret);
    }
    console.log(secretNumber, ': ', newSecret)
    sum += newSecret;
  }
  return sum;
};