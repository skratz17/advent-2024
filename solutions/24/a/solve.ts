import { getTrimmedLines } from '../../../lib/utils/stringManip.ts';
type Operation = 'AND' | 'OR' | 'XOR';
type Gate = {
  operation: Operation;
  output: string;
}

export default (fileData: string) => {
  const lines = getTrimmedLines(fileData);
  const { wires, gates } = parseLines(lines);
  evaluateSystem(wires, gates);
  for(const prefix of [ 'x', 'y', 'z' ]) {
    let line = ''
    line += prefix + ' = ';
    if(prefix !== 'z') line += ' ';
    for(let i = 45; i >= 0; i--) {
      if(wires.has(`${prefix}${i < 10 ? `0${i}` : i}`)) {
        line += wires.get(`${prefix}${i < 10 ? `0${i}` : i}`);
      }
    }
  }
  return findZNumber(wires);
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

const evaluateSystem = (wires: Map<string, number>, gates: Map<string, Map<string, Gate[]>>) => {
  let foundNew = false;
  do {
    foundNew = false;
    for(const wire of wires.keys()) {
      const gatesWithWire = gates.get(wire);
      if(gatesWithWire) {
        for(const [ pairedWire, gates ] of gatesWithWire.entries()) {
          for(const gate of gates) {
            if(!wires.has(gate.output) && wires.has(pairedWire)) {
              const result = evaluateGate(wires.get(wire), wires.get(pairedWire), gate.operation);
              wires.set(gate.output, result);
              foundNew = true;
            }
          }
        }
      }
    }
  } while(foundNew);
};

const evaluateGate = (x: number, y: number, operation: Operation) => {
  switch(operation) {
    case 'AND': {
      return x & y;
    }
    case 'OR': {
      return x | y;
    }
    case 'XOR': {
      return x ^ y;
    }
  }
};

const findZNumber = (wires: Map<string, number>) => {
  const digits: number[] = [];
  for(const [ wire, value ] of wires.entries()) {
    if(wire.startsWith('z')) {
      const digitPlace = parseInt(wire.slice(1), 10);
      digits[digitPlace] = value;
    }
  }
  return parseInt(digits.reverse().join(''), 2);
};