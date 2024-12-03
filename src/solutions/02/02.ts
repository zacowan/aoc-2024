import type { SolutionFn } from "../../utils";

export const partOne: SolutionFn = (input) => {
  const data: number[][] = [];

  const lines = input.split("\n");
  lines.forEach((line) => {
    const numbers = line.split(" ").map((s) => Number.parseInt(s));
    data.push(numbers);
  });

  let numSafeLevels = 0;

  data.forEach((level) => {
    let isSafe = true;
    let prevDiff: number | undefined = undefined;
    for (let i = 0; i < level.length - 1; i++) {
      const curr = level[i]!;
      const next = level[i + 1]!;
      const diff = next - curr;

      if (
        Math.abs(diff) < 1 ||
        Math.abs(diff) > 3 ||
        (prevDiff && Math.sign(diff) !== Math.sign(prevDiff))
      ) {
        isSafe = false;
        break;
      }

      prevDiff = diff;
    }

    if (isSafe) {
      numSafeLevels += 1;
    }
  });

  return numSafeLevels.toString();
};

export const partTwo: SolutionFn = () => {
  return "-1";
};
