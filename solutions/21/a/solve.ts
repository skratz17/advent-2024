import { getTrimmedLines } from '../../../lib/utils/stringManip.ts';

abstract class Keypad {
  protected static directions = [ [ 0, 1 ], [ 1, 0 ], [ 0, -1 ], [ -1, 0 ] ];
  protected static directionsMap = new Map<string, string>([
    [ JSON.stringify([0,1]), '>' ],
    [ JSON.stringify([0,-1]), '<' ],
    [ JSON.stringify([1,0]), 'v' ],
    [ JSON.stringify([-1,0]), '^' ],
  ]);

  protected keypad: Array<string | null>[];
  protected position: number[];
  protected keyPositionsMap: Map<string, number[]>;
  protected sequences: string[];

  constructor() {
    this.keyPositionsMap = new Map();
    this.sequences = [''];
  }

  protected buildKeyPositionsMap() {
    for(let x = 0; x < this.keypad.length; x++) {
      for(let y = 0; y < this.keypad[x].length; y++) {
        if(this.keypad[x][y]) {
          this.keyPositionsMap.set(this.keypad[x][y], [ x, y ]);
        }
      }
    }
  }

  protected goToKey(key: string) {
    const newSequences: string[] = [];
    const visited = new Set<string>();
    const queue: Array<{ sequence: string, position: number[] }> = [
      { sequence: '', position: this.position },
    ];
    let found = false;

    while(queue.length) {
      const check = queue.shift();
      if(this.keypad[check.position[0]][check.position[1]] === key) {
        newSequences.push(check.sequence + 'A');
        found = true;
      } else if(!found) {
        visited.add(this.keypad[check.position[0]][check.position[1]]);
        for(const direction of Keypad.directions) {
          const nextCheckPosition = [
            check.position[0] + direction[0],
            check.position[1] + direction[1]
          ];
          if(this.keypad[nextCheckPosition[0]]?.[nextCheckPosition[1]] && !visited.has(this.keypad[nextCheckPosition[0]]?.[nextCheckPosition[1]] )) {
            queue.push({
              position: nextCheckPosition,
              sequence: check.sequence + Keypad.directionsMap.get(JSON.stringify(direction)),
            });
          }
        }
      }
    }

    const updatedFullSequences: string[] = [];
    for(const sequence of this.sequences) {
      for(const newSequence of newSequences) {
        updatedFullSequences.push(sequence + newSequence);
      }
    }
    this.sequences = updatedFullSequences;

    this.position = this.keyPositionsMap.get(key);
  }

  public inputSequence(sequence: string) {
    for(const char of sequence) {
      this.goToKey(char);
    }
    return this.sequences;
  }
}

class NumericKeypad extends Keypad {
  constructor() {
    super();
    this.keypad = [
      [ '7', '8', '9' ],
      [ '4', '5', '6' ],
      [ '1', '2', '3' ],
      [ null, '0', 'A' ],
    ];
    this.position = [ 3, 2 ];
    this.buildKeyPositionsMap();
  }
}

class ArrowKeypad extends Keypad {
  constructor() {
    super();
    this.keypad = [
      [ null, '^', 'A' ],
      [ '<', 'v', '>' ],
    ];
    this.position = [ 0, 2 ];
    this.buildKeyPositionsMap();
  }
}

export default (fileData: string) => {
  const codes = getTrimmedLines(fileData);
  let sum = 0;

  for(const code of codes) {
    const keypadRobot = new NumericKeypad();
    let shortestFinalSequence: number | undefined;

    const keypadSequences = keypadRobot.inputSequence(code);
    for(const keypadSequence of keypadSequences) {
      const arrowRobot = new ArrowKeypad();
      const arrowRobotSequences = arrowRobot.inputSequence(keypadSequence);
      for(const arrowRobotSequence of arrowRobotSequences) {
        const me = new ArrowKeypad();
        const mySequences = me.inputSequence(arrowRobotSequence);
        for(const mySequence of mySequences) {
          if(shortestFinalSequence === undefined || mySequence.length < shortestFinalSequence) {
            shortestFinalSequence = mySequence.length;
          }
        }
      }
    }

    const codeValue = parseInt(code.slice(0, code.length - 1), 10);
    sum += codeValue * shortestFinalSequence
  }

  return sum;
};