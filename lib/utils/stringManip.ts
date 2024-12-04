export const getTrimmedLines = (data: string) => {
  const lines = data.split('\n');
  return lines
    .map(line => line.trim())
    .filter(line => line);
};