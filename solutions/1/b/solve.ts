export default async (fileData: string) => {
  const aVals: string[] = [];
  let score = 0;
  const map = new Map<string, number>();
  const lines = fileData.split('\n');
  for(let line of lines) {
    line = line.trim();
    if(!line) continue;
    const [a, b] = line.split('   ');
    aVals.push(a);
    let bCount = map.has(b) ? map.get(b)! + 1 : 1;
    map.set(b, bCount);
  }
  for(const aVal of aVals) {
    const num = parseInt(aVal, 10);
    score += num * (map.get(aVal) || 0);
  }
  
  return score;
};