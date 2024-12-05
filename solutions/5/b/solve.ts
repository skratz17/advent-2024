import { buildRulesGraph, calculateUpdatesSum, isValidUpdate } from '../lib/domain.ts';

export default (fileData: string) => {
  const [rulesString, updatesString] = fileData.split('\n\n');
  const rules = rulesString.split('\n');
  const updates = updatesString.split('\n')
    .filter(update => update)
    .map(update => update.split(',').map(updateNum => parseInt(updateNum, 10)));

  const rulesGraph = buildRulesGraph(rules);
  const invalidUpdates = updates.filter(update => !isValidUpdate(update, rulesGraph));
  const validUpdates = invalidUpdates.map(invalidUpdate => fixUpdate(invalidUpdate, rulesGraph));
  return calculateUpdatesSum(validUpdates);
};

const fixUpdate = (invalidUpdate: number[], rulesGraph: Map<number, Set<number>>) => {
  const candidates = [ ...invalidUpdate ];
  const fixedUpdate = buildUpdate([], candidates, rulesGraph);
  return fixedUpdate;
};

const buildUpdate = (update: number[], candidates: number[], rulesGraph: Map<number, Set<number>>) => {
  if(candidates.length === 0) {
    return update;
  }
  
  for(let i = 0; i < candidates.length; i++) {
    const updateCopy = [ ...update ];
    const candidateCopy = [ ...candidates ];
    const num = candidateCopy[i];

    if(updateCopy.length === 0 || rulesGraph.get(updateCopy.at(-1))?.has(num)) {
      updateCopy.push(num);
      candidateCopy.splice(i, 1);
      const update = buildUpdate(updateCopy, candidateCopy, rulesGraph);
      if(update) {
        return update;
      }
    } 
  }
};