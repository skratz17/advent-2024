export type Registers = { A: number, B: number, C: number };

export class Computer {
  private registers: Registers;
  private instructions: number[];
  private instructionPointer = 0;
  private output: number[];
  private readonly operations = {
    0: this.adv,
    1: this.bxl,
    2: this.bst,
    3: this.jnz,
    4: this.bxc,
    5: this.out,
    6: this.bdv,
    7: this.cdv,
  };

  constructor(initialRegisters: Registers, instructions: number[]) {
    this.registers = initialRegisters;
    this.instructions = instructions;
    this.output = [];
  }

  public run() {
    while(true) {
      if(this.instructionPointer >= this.instructions.length - 1) {
        throw new Error('Halt!');
      }

      const instruction = this.instructions[this.instructionPointer];
      const operand = this.instructions[this.instructionPointer + 1];
      this.operations[instruction].call(this, operand);
    }
  }

  public getOutput() {
    return this.output;
  }

  public getRegisters() {
    return this.registers;
  }

  private getLiteralValue(operand: number) {
    return operand;
  }

  private getComboValue(operand: number) {
    if(operand >= 0 && operand <= 3) {
      return operand;
    } else if(operand === 4) {
      return this.registers.A;
    } else if(operand === 5) {
      return this.registers.B;
    } else if(operand === 6) {
      return this.registers.C;
    } else {
      throw new Error('Invalid operand: ' + operand);
    }
  }

  private adv(operand: number) {
    this.registers.A = this.dv(operand);
    this.incrementInstructionPointer();
  }

  private bxl(operand: number) {
    this.registers.B = operand ^ this.registers.B;
    this.incrementInstructionPointer();
  }

  private bst(operand: number) {
    this.registers.B = this.getComboValue(operand) % 8;
    this.incrementInstructionPointer();
  }

  private jnz(operand: number) {
    if(this.registers.A !== 0) {
      this.instructionPointer = this.getLiteralValue(operand);
    } else {
      this.incrementInstructionPointer();
    }
  }

  private bxc(operand: number) {
    this.registers.B = this.registers.B ^ this.registers.C;
    this.incrementInstructionPointer();
  }

  private out(operand: number) {
    const toPrint = this.getComboValue(operand) % 8;
    this.output.push(toPrint);
    this.incrementInstructionPointer();
  }

  private bdv(operand: number) {
    this.registers.B = this.dv(operand);
    this.incrementInstructionPointer();
  }

  private cdv(operand: number) {
    this.registers.C = this.dv(operand);
    this.incrementInstructionPointer();
  }

  private dv(operand: number) {
    const numerator = this.registers.A;
    const denominator = Math.pow(2, this.getComboValue(operand));
    return Math.floor(numerator / denominator);
  }

  private incrementInstructionPointer(increment: number = 2) {
    this.instructionPointer += increment;
    if(this.instructionPointer >= this.instructions.length) {
      throw new Error('Halt!');
    }
  }
}