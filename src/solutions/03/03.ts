import type { SolutionFn } from "../../utils";

interface MultOperation {
  multiplier: number;
  multiplicand: number;
}

const validMultOperationRegex = /mul\(\d{1,3},\d{1,3}\)/gi;
const multiplierMultiplicandRegex = /mul\((\d{1,3}),(\d{1,3})\)/;

const getData = (input: string): MultOperation[] => {
  const multOperations: MultOperation[] = [];

  const multOperationInputMatches = input.matchAll(validMultOperationRegex);
  for (const match of multOperationInputMatches) {
    const multiplierMultiplicand = multiplierMultiplicandRegex.exec(match[0]);
    const multiplier = multiplierMultiplicand![1]!;
    const multiplicand = multiplierMultiplicand![2]!;
    multOperations.push({
      multiplier: Number.parseInt(multiplier),
      multiplicand: Number.parseInt(multiplicand),
    });
  }
  return multOperations;
};

export const partOne: SolutionFn = (input) => {
  const data = getData(input);

  return data
    .reduce(
      (acc, { multiplier, multiplicand }) => acc + multiplier * multiplicand,
      0,
    )
    .toString();
};

export const partTwo: SolutionFn = () => {
  return "-1";
};
