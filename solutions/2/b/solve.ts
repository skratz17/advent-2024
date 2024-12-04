import { getTrimmedLines } from '../../../lib/utils/stringManip.ts';
import { parseReport } from '../lib/parseReport.ts';
import { countViolations } from '../lib/domain.ts';

export default async (fileData: string) => {
  let safeReports = 0;
  const lines = getTrimmedLines(fileData);
  const reports = lines.map(line => parseReport(line));
  for (const report of reports) {
    const violations = countViolations(report);
    if(violations.length === 0) safeReports++;
    else {
      for(let i = 0; i < report.length; i++) {
        const adjustedReport = [ ...report ];
        adjustedReport.splice(i, 1);
        if(countViolations(adjustedReport).length === 0) {
          safeReports++;
          break;
        }
      }
    }
  }
  return safeReports;
};