import type { SolutionFn } from "../../utils";

const getData = (input: string): number[][] => {
  const data: number[][] = [];

  const lines = input.split("\n");
  lines.forEach((line) => {
    const numbers = line.split(" ").map((s) => Number.parseInt(s));
    data.push(numbers);
  });

  return data;
};

const checkIfDiffIsUnsafe = (diff: number, prevDiff?: number): boolean => {
  return (
    Math.abs(diff) < 1 ||
    Math.abs(diff) > 3 ||
    (prevDiff !== undefined && Math.sign(diff) !== Math.sign(prevDiff))
  );
};

const validateLevelSafety = (level: number[]) => {
  let isSafe = true;
  let prevDiff: number | undefined = undefined;
  for (let i = 0; i < level.length - 1; i++) {
    const curr = level[i]!;
    const next = level[i + 1]!;
    const diff = next - curr;

    if (checkIfDiffIsUnsafe(diff, prevDiff)) {
      isSafe = false;
      break;
    }

    prevDiff = diff;
  }

  return {
    isSafe,
  };
};

export const partOne: SolutionFn = (input) => {
  const data = getData(input);

  let numSafeLevels = 0;

  data.forEach((level) => {
    const { isSafe } = validateLevelSafety(level);

    if (isSafe) {
      numSafeLevels += 1;
    }
  });

  return numSafeLevels.toString();
};

const validateLevelSafetyWithSkips = (level: number[]): boolean => {
  const { isSafe } = validateLevelSafety(level);

  if (!isSafe) {
    // try removing each element individually and checking
    const results: boolean[] = [];
    for (let i = 0; i < level.length; i++) {
      const { isSafe: filteredIsSafe } = validateLevelSafety(
        level.filter((_, li) => li !== i),
      );
      results.push(filteredIsSafe);
    }
    return results.some(Boolean);
  }

  return true;
};

export const partTwo: SolutionFn = (input) => {
  const data = getData(input);

  let numSafeLevels = 0;

  data.forEach((level) => {
    const isSafe = validateLevelSafetyWithSkips(level);

    if (isSafe) {
      numSafeLevels += 1;
    }
  });

  return numSafeLevels.toString();
};
