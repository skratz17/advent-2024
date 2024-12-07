type Operation = '+' | '*' | '||';

export const operationsMap: Record<Operation, (operandA: number, operandB: number) => number> = {
  '+': (a, b) => a + b,
  '*': (a, b) => a * b,
  '||': (a, b) => parseInt('' + a + b, 10),
};

export const isResultAchievable = (
  target: number,
  operands: number[],
  currentValue: number,
  operations: Array<Operation>
) => {
  if(currentValue === target && operands.length === 0) {
    return true;
  } else if (operands.length === 0 || currentValue > target) {
    return false;
  }

  const operandsCopy = [ ...operands ];
  const curr = currentValue ?? operandsCopy.shift();
  const nextOperand = operandsCopy.shift();
  for(const operation of operations) {
    const result = isResultAchievable(target, operandsCopy, operationsMap[operation](curr, nextOperand), operations);
    if(result) return result;
  }
  return false;
};