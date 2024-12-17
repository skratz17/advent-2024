import { getTrimmedLines } from '../../../lib/utils/stringManip.ts';
import { Computer } from '../lib/Computer.ts';

export default (fileData: string) => {
  const lines = getTrimmedLines(fileData);
  const registerVals: number[] = [];
  const instructions: number[] = [];
  for(const line of lines) {
    if(line.startsWith('Register')) {
      registerVals.push(parseInt(line.split(':')[1].trim(), 10));
    } else {
      instructions.push(...line.split(':')[1].trim().split(',').map(val => parseInt(val, 10)));
    }
  }

  const computer = new Computer({
    A: registerVals[0],
    B: registerVals[1],
    C: registerVals[2],
  }, instructions);

  try {
    computer.run();
  } catch {
    console.log(JSON.stringify(computer.getOutput()));
  }
};