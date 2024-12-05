import type { SolutionFn } from "../../utils";

interface MultOperation {
  multiplier: number;
  multiplicand: number;
  index: number;
}

const validMultOperationRegex = /mul\(\d{1,3},\d{1,3}\)/g;
const multiplierMultiplicandRegex = /mul\((\d{1,3}),(\d{1,3})\)/;

const getMultOperations = (input: string): MultOperation[] => {
  const multOperations: MultOperation[] = [];

  const multOperationInputMatches = input.matchAll(validMultOperationRegex);
  for (const match of multOperationInputMatches) {
    const multiplierMultiplicand = multiplierMultiplicandRegex.exec(match[0]);
    const multiplier = multiplierMultiplicand![1]!;
    const multiplicand = multiplierMultiplicand![2]!;
    multOperations.push({
      multiplier: Number.parseInt(multiplier),
      multiplicand: Number.parseInt(multiplicand),
      index: match.index,
    });
  }
  return multOperations;
};

export const partOne: SolutionFn = (input) => {
  const multOperations = getMultOperations(input);

  return multOperations
    .reduce(
      (acc, { multiplier, multiplicand }) => acc + multiplier * multiplicand,
      0,
    )
    .toString();
};

interface DoDontOperation {
  type: "do" | "don't";
  index: number;
}

const validDoDontOperationRegex = /(don't\(\))|(do\(\))/g;

const getDoDontOperations = (input: string): DoDontOperation[] => {
  const doDontOperations: DoDontOperation[] = [];

  const matches = input.matchAll(validDoDontOperationRegex);
  for (const match of matches) {
    doDontOperations.push({
      type: match[0] === "do()" ? "do" : "don't",
      index: match.index,
    });
  }
  return doDontOperations;
};

const isMultOperationDisabled = (
  multOperation: MultOperation,
  doDontOperations: DoDontOperation[],
): boolean => {
  // this is a dirty, gross clone lol
  const mostRecentDoDontOperation = [...doDontOperations]
    .reverse()
    .find((op) => op.index < multOperation.index);
  if (!mostRecentDoDontOperation) {
    return false;
  }
  if (mostRecentDoDontOperation.type === "do") {
    return false;
  }
  return true;
};

export const partTwo: SolutionFn = (input) => {
  const multOperations = getMultOperations(input);
  const doDontOperations = getDoDontOperations(input);

  return multOperations
    .reduce((acc, multOperation) => {
      const isDisabled = isMultOperationDisabled(
        multOperation,
        doDontOperations,
      );
      if (isDisabled) {
        return acc;
      }
      return acc + multOperation.multiplier * multOperation.multiplicand;
    }, 0)
    .toString();
};
