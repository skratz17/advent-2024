import { getTrimmedLines } from '../../../lib/utils/stringManip.ts';
import { generateSecretNumber } from '../lib/domain.ts';

export default (fileData: string) => {
  const secretNumbers = getTrimmedLines(fileData).map(x => parseInt(x, 10));
  const changeMap = new Map<number, Map<string, number>>();

  for(const secretNumber of secretNumbers) {
    const sequenceToBananasMap = new Map<string, number>();
    changeMap.set(secretNumber, sequenceToBananasMap);
    const secretNumbers: number[] = [];
    const changes: number[] = [];
    let newSecret = secretNumber;
    for(let i = 0; i < 2000; i++) {
      newSecret = generateSecretNumber(newSecret);
      secretNumbers.push(newSecret);
      if(secretNumbers.length > 1) {
        changes.push(getLastDigit(secretNumbers.at(-1)) - getLastDigit(secretNumbers.at(-2)));
      } else {
        changes.push(getLastDigit(secretNumbers.at(-1)) - getLastDigit(secretNumber));
      }
      if(changes.length >= 4) {
        const changeKey = JSON.stringify(changes.slice(changes.length - 4));
        if(!sequenceToBananasMap.has(changeKey)) {
          sequenceToBananasMap.set(changeKey, getLastDigit(newSecret));
        }
      }
    }
  }

  return findMostBananas(changeMap);
};

const getLastDigit = (x: number) => {
  return x % 10;
};

const findMostBananas = (changeMap: Map<number, Map<string, number>>) => {
  let mostBananas: number | undefined;
  let bestSequence = '';
  const visited = new Set<string>();

  for(const secretNumber of changeMap.keys()) {
    const changesMap = changeMap.get(secretNumber);
    for(const sequence of changesMap.keys()) {
      if(visited.has(sequence)) continue;
      let bananasInSequence = 0;
      for(const anotherSecret of changeMap.keys()) {
        bananasInSequence += changeMap.get(anotherSecret)?.get(sequence) || 0;
      }
      if(mostBananas === undefined || bananasInSequence > mostBananas) {
        bestSequence = sequence;
        mostBananas = bananasInSequence;
      }
      visited.add(sequence);
    }
  }

  return mostBananas;
};