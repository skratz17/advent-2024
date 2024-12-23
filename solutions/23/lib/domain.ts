export const buildConnectionsMap = (connections: string[]) => {
  const connectionsMap = new Map<string, Set<string>>();

  for(const connection of connections) {
    const [ a, b ] = connection.split('-');
    const aSet = connectionsMap.get(a) ?? new Set();
    const bSet = connectionsMap.get(b) ?? new Set();
    aSet.add(b);
    bSet.add(a);
    connectionsMap.set(a, aSet);
    connectionsMap.set(b, bSet);
  }

  return connectionsMap;
};