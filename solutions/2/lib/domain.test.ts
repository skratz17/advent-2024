import { countViolations } from './domain.ts';

describe('problem 2 domain functions', () => {
  it('should count 0 violations for safely decreasing sequence', () => {
    const sequence = [ 7, 6, 4, 2, 1 ];
    const violations = countViolations(sequence);
    expect(violations).toStrictEqual([]);
  });

  it('should identify correct index for too large of increase in sequence', () => {
    const sequence = [ 1, 2, 7, 8, 9 ];
    const violations = countViolations(sequence);
    expect(violations).toStrictEqual([ 1 ]);
  });

  it('should identify correct index for too large of decrease in sequence', () => {
    const sequence = [ 9, 7, 6, 2, 1 ];
    const violations = countViolations(sequence);
    expect(violations).toStrictEqual([ 2 ]);
  });

  it('should identify correct index for incorrect change in trend', () => {
    const sequence = [ 1, 3, 2, 4, 5 ];
    const violations = countViolations(sequence);
    expect(violations).toStrictEqual([ 1 ]);
  });

  it('should identify correct index for repeated value', () => {
    const sequence = [ 8, 6, 4, 4, 1 ];
    const violations = countViolations(sequence);
    expect(violations).toStrictEqual([ 2 ]);
  });
});