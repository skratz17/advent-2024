import { readFile } from '../../lib/utils/readFile.ts';
import path from 'node:path';
import oneA from './a/solve.ts';
import oneB from './b/solve.ts';

export default async (subProblemId: string) => {
  const fileData = await readFile(path.join(import.meta.dirname, './input.txt'));
  if(subProblemId === 'a') {
    return oneA(fileData);
  } else if (subProblemId === 'b') {
    return oneB(fileData);
  }
};