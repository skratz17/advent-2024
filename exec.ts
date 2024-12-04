import { solutions } from './solutions.ts';

const problemId = process.argv[2];
const subProblemId = process.argv[3];
const solver = solutions[problemId];

if(!solver) {
  throw new Error(`No solution has been implemented for id ${problemId}.`);
}

console.log(await solver(subProblemId));