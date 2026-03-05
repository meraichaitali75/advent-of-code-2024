/** 
*Advent of Code 2024 - Red Nosed Reports
*@author Chaitali
*/
class ReportAnalyzer {
  /**
  * Vslidated if a sequence of level is "safe":
  *1.All increasing or all decreasing
  *2.Variance (Difference between 1 and 3 inclusive)
  */
  public static isSafe(levels: number[]): boolean {
    if (levels.length < 2) return true;

    const isIncreasing = levels[1]! - levels[0]!;

    for (let i = 0; i < levels.length - 1; i++) {
      const current = levels[i]!;
      const next = levels[i + 1]!;


      const diff = next - current;
      const absDiff = Math.abs(diff);

      if (absDiff < 1 || absDiff > 3) return false;

      if (isIncreasing && diff <= 0) return false;
      if (!isIncreasing && diff >= 0) return false;
    }
    return true;
  }
  /**
  *Problem Dampener
  *checks if removing a single level makes an unsafe report safe.
  */
  public static isSafeWithDampener(levels: number[]): boolean {
    if (this.isSafe(levels)) return true;

    return levels.some((_, index) => {
      const dampned = [...levels.slice(0, index), ...levels.slice(index + 1)];
      return this.isSafe(dampned);
    });
  }
}

const solvePuzzle = (input: string): { part1: number; part2: number } => {
  const reports = input
    .trim()
    .split('\n')
    .filter(line => line.trim() !== '')
    .map(line => line.split(/\s+/).map(Number));

  const part1 = reports.filter(levels => ReportAnalyzer.isSafe(levels)).length;
  const part2 = reports.filter(levels => ReportAnalyzer.isSafeWithDampener(levels)).length;

  return { part1, part2 };
};

  // ---Execution ---
const rawInput = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`;

  const results = solvePuzzle(rawInput);
  console.log(`Part 1 (Safe): ${results.part1}`);
  console.log(`Part 2 (Dampened): ${results.part2}`);
