import { MinHeap } from '../../../lib/ds/MinHeap.ts';

export default async (fileData: string) => {
  const heapA = new MinHeap();
  const heapB = new MinHeap();

  let distance = 0;

  const lines = fileData.split('\n');
  for(let line of lines) {
    line = line.trim();
    if(!line) continue;
    const [a, b] = line.split('   ');
    heapA.insert(parseInt(a, 10));
    heapB.insert(parseInt(b, 10));
  }
  while(heapA.size() && heapB.size()) {
    const aVal = heapA.removeMin();
    const bVal = heapB.removeMin();
    distance += Math.abs(aVal - bVal);
  }
  return distance;
};