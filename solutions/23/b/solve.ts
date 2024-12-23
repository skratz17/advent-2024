import { getTrimmedLines } from '../../../lib/utils/stringManip.ts';
import { buildConnectionsMap } from '../lib/domain.ts';

export default (fileData: string) => {
  const connections = getTrimmedLines(fileData);
  const connectionsMap = buildConnectionsMap(connections);
  return getLargestSet(connectionsMap);
};

const getLargestSet = (connectionsMap: Map<string, Set<string>>) => {
  let password: string | undefined;

  for(const computer of connectionsMap.keys()) {
    const connectedComputers = connectionsMap.get(computer);
    while(connectedComputers.size > 0) {
      const visited = [ computer ];
      connectedComputers.forEach(connection => {
        if(visited.every(visit => connectionsMap.get(visit).has(connection))) {
          visited.push(connection);
        }
      });
      if(password === undefined || visited.join(',').length > password.length) {
        password = visited.sort().join(',');
      }
      for(const visit of visited) {
        for(const visit2 of visited) {
          if(visit !== visit2) {
            connectionsMap.get(visit).delete(visit2);
            connectionsMap.get(visit2).delete(visit);
          }
        }
      }
    }
  }

  return password;
};