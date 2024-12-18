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
  
  // does not work
  const work = (registerA: string, pointer: number, registers: Registers) => {
    console.log(registerA)
    if(pointer === instructions.length) {
      console.log(registerA);
      return registerA;
    }

    for(let aVal = 0; aVal < 8; aVal++) {
      const computer = new Computer({
        ...registers,
        A: parseInt(registerA + getThreeDigitBinary(aVal), 2),
      }, instructions);

      try {
        computer.run();
      } catch {
        if(computer.getOutput()[0] === instructions[pointer]) {
          work(registerA + getThreeDigitBinary(aVal), pointer + 1, {
            A: parseInt(registerA + getThreeDigitBinary(aVal), 2),
            B: computer.getRegisters().B,
            C: computer.getRegisters().C,
          });
        }
      }
    }
  }

  return work('', 0, {
    A: registerVals[0],
    B: registerVals[1],
    C: registerVals[2],
  });
};

const getThreeDigitBinary = (val: number) => {
  let nextThree = val.toString(2);
  while(nextThree.length < 3) nextThree = '0' + nextThree;
  return nextThree;
};