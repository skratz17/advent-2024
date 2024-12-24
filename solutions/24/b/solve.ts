import { getTrimmedLines } from '../../../lib/utils/stringManip.ts';
type Operation = 'AND' | 'OR' | 'XOR';
type Gate = {
  operation: Operation;
  output: string;
}

export default (fileData: string) => {
  const lines = getTrimmedLines(fileData);
  const { gates } = parseLines(lines);
  examineGates(gates);
};

const parseLines = (lines: string[]) => {
  const wires = new Map<string, number>();
  const gates = new Map<string, Map<string, Gate[]>>();

  for(const line of lines) {
    if(line.includes(':')) {
      const match = line.match(/(?<wire>[\w]+): (?<value>[01])/);
      wires.set(match.groups.wire, parseInt(match.groups.value));
    } else {
      const match = line.match(/(?<wire1>[\w]+) (?<operation>[\w+]+) (?<wire2>[\w]+) -> (?<output>[\w]+)/);
      const { wire1, wire2, operation, output } = match.groups;
      const gate = {
        operation: operation as Operation,
        output: output,
      };
      const map1 = gates.get(wire1) ?? new Map<string, Gate[]>();
      const gates1 = map1.get(wire2) ?? [];
      gates1.push(gate);
      map1.set(wire2, gates1);
      const map2 = gates.get(wire2) ?? new Map<string, Gate[]>();
      const gates2 = map2.get(wire1) ?? [];
      gates2.push(gate);
      map2.set(wire1, gates2);
      gates.set(wire1, map1);
      gates.set(wire2, map2);
    }
  }

  return { wires, gates };
};

/**
 * Obviously, this doesn't really programatically solve this.
 * I just read up on how bit-by-bit addition with AND/OR/XOR only works, and 
 * found the wires that represented the sum and carry of each x## y## wire pair (only works because input contains AND and XOR for each matching X## Y## wire)
 * Then, I just examined the gate configs for each sum wire and saw that each had:
 *  an XOR with a different wire - this was the XOR with the prev carry that creates the final Z## output for this bit, and
 *  an AND with that same wire - this was the AND that, when ORed with the carryBit (X## & Y##) produces the final carry from this bit
 * I also examined the gate configs for each carry wire and saw that each had:
 *  an OR with the output wire from the same bit's sumWire's AND operation
 * With this, it was ultimately pretty easy to see where the swaps were when printing output, and I wound up just manually identifying
 * where the swaps were required, and got it right on my first try... 
 * May try to build an actual code solution, but for now just keeping the code that led to the answer.
 */
const examineGates = (gates: Map<string, Map<string, Gate[]>>) => {
  const sumWires: string[] = [];
  const carryWires: string[] = [];

  for(let i = 0; i <= 44; i++) {
    const suffix = i < 10 ? `0${i}` : i;
    const xKey = `x${suffix}`;
    const yKey = `y${suffix}`;
    const xGates = gates.get(xKey).get(yKey);
    const sumWire = xGates.find(gate => gate.operation === 'XOR');
    if(!sumWire) {
      throw new Error(`ON ${i}`);
    }
    sumWires.push(sumWire.output)
    const carryWire = xGates.find(gate => gate.operation === 'AND');
    if(!carryWire) {
      throw new Error(`ON ${i}`);
    }
    carryWires.push(carryWire.output)
  } 
  for(let i = 1; i <= 45; i++) {
    const bitCarry = carryWires[i];
    const sum = sumWires[i];
    console.log('******', i);
    // console.log(bitCarry)
    // console.log(gates.get(bitCarry));
    // const bitGates = gates.get(bitCarry);
    console.log(sum);
    console.log(gates.get(sum));
  }
};