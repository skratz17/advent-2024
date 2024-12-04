import { getTrimmedLines } from '../../../lib/utils/stringManip.ts';
import { parseReport } from '../lib/parseReport.ts'
import { countViolations } from '../lib/domain.ts';

export default async (fileData: string) => {
  const lines = getTrimmedLines(fileData);
  const reports = lines.map(line => parseReport(line));
  const safeReports = reports.filter(report => countViolations(report).length === 0);
  return safeReports.length;
};