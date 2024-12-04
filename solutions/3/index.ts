import { readFile } from '../../lib/utils/readFile.ts';
import path from 'node:path';
import threeA from './a/solve.ts';
import threeB from './b/solve.ts';

export default async (subProblemId: string) => {
  const fileData = await readFile(path.join(import.meta.dirname, './input.txt'));
  if (subProblemId === 'a') {
    return await threeA(fileData);
  } else if(subProblemId === 'b') {
    return await threeB(fileData);
  }
};