import { getTrimmedLines } from '../../../lib/utils/stringManip.ts';
import { Computer, type Registers } from '../lib/Computer.ts';

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
  
  const work = (registerA: string, pointer: number, registers: Registers) => {
    if(pointer < 0) {
      return registerA;
    }

    for(let aVal = 0; aVal < 8; aVal++) {
      const newARegister = registerA + getThreeDigitBinary(aVal);
      const computer = new Computer({
        ...registers,
        A: parseInt(newARegister, 2),
      }, instructions);

      try {
        computer.run();
      } catch {
        if(computer.getOutput()[0] === instructions[pointer]) {
          const result = work(newARegister, pointer - 1, {
            A: parseInt(getThreeDigitBinary(aVal), 2),
            B: computer.getRegisters().B,
            C: computer.getRegisters().C,
          });
          if(result) {
            return result;
          }
        }
      }
    }
  }

  return parseInt(work('', instructions.length - 1, {
    A: registerVals[0],
    B: registerVals[1],
    C: registerVals[2],
  }), 2);
};

const getThreeDigitBinary = (val: number) => {
  let nextThree = val.toString(2);
  while(nextThree.length < 3) nextThree = '0' + nextThree;
  return nextThree;
};