import { getTrimmedLines } from '../../../lib/utils/stringManip.ts';

// keeping part a's naive solution
export default (fileData: string) => {
  const lines = getTrimmedLines(fileData);
  let tokens = 0;
  for(let i = 0; i < lines.length; i += 3) {
    const a = getButtonIncrements(lines[i]);
    const b = getButtonIncrements(lines[i + 1]);
    const prize = getPrizeLocation(lines[i + 2]);
    tokens += getCost(prize, a, b);
  }
  return tokens;
};

const getButtonIncrements = (buttonInfo: string) => {
  const buttonIncrements = buttonInfo.match(/(\d+)/g);
  return buttonIncrements.map(button => parseInt(button, 10));
};

const getPrizeLocation = (prizeInfo: string) => {
  const prizeLocations = prizeInfo.match(/(\d+)/g);
  return prizeLocations.map(prizeLocation => parseInt(prizeLocation, 10) + 10000000000000);
};

const getCost = (prize: number[], a: number[], b: number[]) => {
  const xButtonPresses = getAxisButtonPresses(prize[0], a[0], b[0]);
  let bestPrice: number | null = null;
  for(const xButtonPress of xButtonPresses) {
    if(isValidButtonPress(prize[1], a[1], b[1], xButtonPress)) {
      const price = (xButtonPress[0] * 3) + xButtonPress[1];
      if(bestPrice === null || price < bestPrice) {
        bestPrice = price;
      }
    }
  }
  return bestPrice || 0;
};

const getAxisButtonPresses = (prize: number, a: number, b: number) => {
  const buttonPresses: number[][] = [];
  let aCount = 0;
  while(prize >= 0) {
    if(prize % b === 0) {
      buttonPresses.push([ aCount, Math.floor(prize / b) ]);
    }
    prize -= a;
    aCount++;
  }
  return buttonPresses;
};

const isValidButtonPress = (prize: number, a: number, b: number, buttonPresses: number[]) => {
  return (a * buttonPresses[0]) + (b * buttonPresses[1]) === prize;
};