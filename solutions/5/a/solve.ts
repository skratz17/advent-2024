import { buildRulesGraph, isValidUpdate, calculateUpdatesSum  } from '../lib/domain.ts';

export default (fileData: string) => {
  const [rulesString, updatesString] = fileData.split('\n\n');
  const rules = rulesString.split('\n');
  const updates = updatesString.split('\n')
    .filter(update => update)
    .map(update => update.split(',').map(updateNum => parseInt(updateNum, 10)));

  const rulesGraph = buildRulesGraph(rules);
  const validUpdates = updates.filter(update => isValidUpdate(update, rulesGraph));
  return calculateUpdatesSum(validUpdates);
};