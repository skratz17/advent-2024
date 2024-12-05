export const buildRulesGraph = (rules: string[]) => {
  const rulesDict = new Map<number, Set<number>>();
  for(const rule of rules) {
    const [beforeString, afterString] = rule.split('|');
    const before = parseInt(beforeString, 10);
    const after = parseInt(afterString, 10);
    const set = rulesDict.get(before) || new Set<number>();
    set.add(after);
    rulesDict.set(before, set);
  }
  return rulesDict;
};

export const isValidUpdate = (update: number[], rulesGraph: Map<number, Set<number>>) => {
  let validNextNodes = rulesGraph.get(update[0]);
  for(let i = 1; i < update.length; i++) {
    if(!validNextNodes.has(update[i])) return false;
    validNextNodes = rulesGraph.get(update[i]);
  }
  return true;
};

export const calculateUpdatesSum = (updates: number[][]) => {
  let sum = 0;
  for(const update of updates) {
    sum += update[Math.floor(update.length / 2)];
  }
  return sum;
};