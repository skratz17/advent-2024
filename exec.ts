import { readFile } from './lib/utils/readFile.ts';
import { solutions } from './solutions.ts';
import path from 'node:path';

const problemId = process.argv[2];
const subProblemId = process.argv[3];
if(!problemId || !subProblemId) {
  throw new Error('Both problem and subproblem ID are required (ex: `npm run exec -- 1 a`).');
}

const solver = solutions[problemId];

if(!solver) {
  throw new Error(`No solution has been implemented for id ${problemId}.`);
}

const subProblemSolver = solver[subProblemId];

if(!subProblemSolver) {
  throw new Error(`No solution has been implemented for subproblem id ${subProblemId} of day ${problemId}.`);
}

const fileData = await readFile(path.join(import.meta.dirname, `./solutions/${problemId}/input.txt`));
console.log(await subProblemSolver(fileData));