export const parseReport = (reportLine: string) => {
  return reportLine.split(' ').map(val => parseInt(val, 10));
};
