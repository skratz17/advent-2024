import { getTrimmedLines } from '../../../lib/utils/stringManip.ts';
import { buildConnectionsMap } from '../lib/domain.ts';

export default (fileData: string) => {
  const connections = getTrimmedLines(fileData);
  const connectionsMap = buildConnectionsMap(connections);
  const uniqueThreesomes = getUniqueThreesomes(connectionsMap);
  return countTs(uniqueThreesomes);
};

const getUniqueThreesomes = (connectionsMap: Map<string, Set<string>>) => {
  const uniqueThreesomes = new Set<string>();
  for(const computer of connectionsMap.keys()) {
    const connectedComputers = connectionsMap.get(computer);
    for(const connectedComputer of connectedComputers) {
      const connectedComputersSecond = connectionsMap.get(connectedComputer);
      for(const secondConnection of connectedComputersSecond) {
        const thirdComputers = connectionsMap.get(secondConnection);
        if(thirdComputers.has(computer)) {
          uniqueThreesomes.add(JSON.stringify([ computer, connectedComputer, secondConnection ].sort()));
        }
      }
    }
  }
  return uniqueThreesomes;
};

const countTs = (uniqueThreesomes: Set<string>) => {
  let tCounts = 0;
  for(const threesome of uniqueThreesomes.values()) {
    const array = JSON.parse(threesome);
    if(array.some(computer => computer.startsWith('t'))) {
      tCounts++;
    }
  }
  return tCounts;
};