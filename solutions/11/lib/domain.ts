export const getNextRocks = (rock: string) => {
  if(rock === '0') {
    return [ '1' ];
  } else if (rock.length % 2 === 0) {
    const newRocks =  [ rock.substring(0, Math.floor(rock.length / 2)), rock.substring(Math.floor(rock.length / 2)) ];
    return newRocks.map(newRock => stripLeadingZero(newRock));
  } else {
    const val = parseInt(rock, 10);
    return [ (val * 2024) + '' ];
  }
};

const stripLeadingZero = (rock: string) => {
  let i = 0;
  while(rock[i] === '0') { i++; }
  return rock.substring(i) || '0';
};