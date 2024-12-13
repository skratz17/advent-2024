import { getTrimmedLines } from '../../../lib/utils/stringManip.ts';

export default (fileData: string) => {
  const lines = getTrimmedLines(fileData);
  let tokens = 0;
  for(let i = 0; i < lines.length; i += 3) {
    const a = getButtonIncrements(lines[i]);
    const b = getButtonIncrements(lines[i + 1]);
    const prize = getPrizeLocation(lines[i + 2]);
    const numerator = prize[1] - ((prize[0] / a[0]) * a[1]);
    const denominator = b[1] - ((a[1] * b[0]) / a[0]);
    const ratio = numerator / denominator;
    // deeply disturbing that this works... this should be fixed to be more mathematical lol
    if(Math.abs(ratio - Math.round(ratio)) < 2e-4) {
      const bPresses = Math.round(numerator / denominator);
      tokens += (bPresses) + (((prize[0] - (b[0] * bPresses)) / a[0]) * 3);
    }
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