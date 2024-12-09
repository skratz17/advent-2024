import { getTrimmedLines } from '../../../lib/utils/stringManip.ts';
import { calculateChecksum, getId } from '../lib/domain.ts';

export default (fileData: string) => {
  const data = getTrimmedLines(fileData)[0].split('').map(val => parseInt(val, 10));
  const fileSystem = buildFileSystem(data);
  return calculateChecksum(fileSystem);
};

const buildFileSystem = (data: number[]) => {
  const movedFiles = new Map<number, number[]>();
  const loggedIds = new Set<number>();
  let endPointer = data.length % 2 === 0 ? data.length - 2 : data.length - 1;
  for(let i = endPointer; i >= 2; i -= 2) {
    for(let j = 1; j < i; j += 2) {
      if(data[i] <= data[j]) {
        const id = getId(i);
        const movedFilesArr = movedFiles.get(j) ?? [];
        for(let k = 0; k < data[i]; k++) {
          movedFilesArr.push(id);
        }
        movedFiles.set(j, movedFilesArr);
        data[j] -= data[i];
        break;
      }
    }
  };
  const fileSystem = [];
  for(let i = 0; i < data.length; i++) {
    if(i % 2 === 0) {
      for(let j = 0; j < data[i]; j++) {
        const toPush = loggedIds.has(getId(i)) ? 0 : getId(i);
        fileSystem.push(toPush);
      }
      loggedIds.add(getId(i));
    } else {
      const movedFilesArr = movedFiles.get(i);
      if(movedFilesArr) {
        for(const id of movedFilesArr) {
          fileSystem.push(id);
          loggedIds.add(id);
        }
      }
      for(let j = 0; j < data[i]; j++) {
        fileSystem.push(0);
      }
    }
  }
  return fileSystem;
};