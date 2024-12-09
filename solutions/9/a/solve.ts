import { getTrimmedLines } from '../../../lib/utils/stringManip.ts';
import { calculateChecksum, getId } from '../lib/domain.ts';

export default (fileData: string) => {
  const data = getTrimmedLines(fileData)[0].split('').map(val => parseInt(val, 10));
  const fileSystem = buildFileSystem(data);
  return calculateChecksum(fileSystem);
};

const buildFileSystem = (data: number[]) => {
  const fileSystem = [];
  let endPointer = data.length % 2 === 0 ? data.length - 2 : data.length - 1;
  for(let i = 0; i <= endPointer; i++) {
    if(i % 2 === 0) {
      const id = getId(i);
      for(let j = 0; j < data[i]; j++) {
        fileSystem.push(id);
      }
    } else {
      while(data[i] && i < endPointer) {
        if(data[endPointer]) {
          const id = getId(endPointer);
          fileSystem.push(id);
          data[endPointer]--;
          data[i]--;
        } else {
          endPointer -= 2;
        }
      }
    }
  }
  return fileSystem;
};