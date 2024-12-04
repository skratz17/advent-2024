import { MUL_REGEX, evaluateMul } from '../lib/domain.ts';

export default async (fileData: string) => {
  const chunks = findActiveChunks(fileData);
  let sum = 0;
  for(const chunk of chunks) {
    const matches = chunk.match(MUL_REGEX);
    for(const match of matches) {
      sum += evaluateMul(match);
    }
  }
  return sum;
};

const findActiveChunks = (fileData: string) => {
  const chunks = [];
  let index = 0;
  while(true) {
    const doIndex = index === 0 ? 0 : findNextDo(fileData, index);
    const dontIndex = findNextDont(fileData, doIndex);
    if(doIndex === -1) break;
    chunks.push(fileData.substring(doIndex, dontIndex === -1 ? fileData.length : dontIndex));
    if(dontIndex === -1) break;
    index = dontIndex + 1;
  }
  return chunks;
};

const findNextDo = (fileData: string, index: number) => {
  return fileData.indexOf('do()', index);
};

const findNextDont = (fileData: string, index: number) => {
  return fileData.indexOf('don\'t()', index);
};