import { getTrimmedLines } from '../../../lib/utils/stringManip.ts';
import { isResultAchievable } from '../lib/domain.ts';

export default (fileData: string) => {
  let sum = 0;
  const lines = getTrimmedLines(fileData);
  for(const line of lines) {
    const [ resultStr, ...operandStrs ] = line.split(' ');
    const result = parseInt(resultStr.substring(0, resultStr.length - 1), 10);
    const operands = operandStrs.map(operandStr => parseInt(operandStr, 10));
    if(isResultAchievable(result, operands, null, ['+', '*', '||'])) {
      sum += result;
    }
  }
  return sum;
};