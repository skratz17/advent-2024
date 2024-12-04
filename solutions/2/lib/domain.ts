export const countViolations = (report: number[]) => {
  let violations = [];
  const isIncreasing = isReportIncreasing(report);
  let index = 0;
  while(index <= report.length - 2) {
    if(isIncreasing && report[index] > report[index + 1]) violations.push(index);
    else if(!isIncreasing && report[index] < report[index + 1]) violations.push(index);
    else {
      const diff = Math.abs(report[index] - report[index + 1]);
      if(diff > 3 || diff === 0) violations.push(index);
    }
    index++;
  }
  return violations;
};

export const isReportIncreasing = (report: number[]) => {
  const counts = {
    increasing: 0,
    decreasing: 0,
  };
  for(let i = 0; i < 4; i++) {
    if(i + 1 >= report.length) break;
    if (report[i] < report[i + 1]) counts.increasing++;
    else counts.decreasing++;
  }
  return counts.increasing > counts.decreasing;
};
