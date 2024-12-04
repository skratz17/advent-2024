import { readFile } from '../../lib/utils/readFile.ts';
import path from 'node:path';
import fourA from './a/solve.ts';
import fourB from './b/solve.ts';

export default async (subProblemId: string) => {
  const fileData = await readFile(path.join(import.meta.dirname, './input.txt'));
  if (subProblemId === 'a') {
    return await fourA(fileData);
  } else if(subProblemId === 'b') {
    return await fourB(fileData);
  }
};