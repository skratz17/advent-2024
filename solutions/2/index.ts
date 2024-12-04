import { readFile } from '../../lib/utils/readFile.ts';
import path from 'node:path';
import twoA from './a/solve.ts';
import twoB from './b/solve.ts';

export default async (subProblemId: string) => {
  const fileData = await readFile(path.join(import.meta.dirname, './input.txt'));
  if (subProblemId === 'a') {
    return await twoA(fileData);
  } else if (subProblemId === 'b') {
    return await twoB(fileData);
  }
};