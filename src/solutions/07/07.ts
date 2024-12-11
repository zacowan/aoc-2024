import type { SolutionFn } from "../../utils";

interface Equation {
  targetValue: number;
  numbers: number[];
}

const numberRegex = /\d+/g;

const getData = (input: string): Equation[] => {
  const equations: Equation[] = [];

  input.split("\n").forEach((line) => {
    const matches = line.matchAll(numberRegex);
    const numbers: number[] = [];
    for (const match of matches) {
      numbers.push(Number.parseInt(match[0]));
    }

    const targetValue = numbers.reverse().pop()!;
    equations.push({
      targetValue,
      numbers: numbers.reverse(),
    });
  });

  return equations;
};

const checkIfEquationIsValid = (
  equation: Equation,
  {
    currIndex,
    currSum,
    isPartTwo,
  }: { currIndex: number; currSum: number; isPartTwo: boolean },
): boolean => {
  const currNum = equation.numbers.at(currIndex);

  if (currNum === undefined) {
    return currSum === equation.targetValue;
  }

  const isValidIfMultiplied = checkIfEquationIsValid(equation, {
    currIndex: currIndex + 1,
    currSum: currSum * currNum,
    isPartTwo,
  });
  const isValidIfAdded = checkIfEquationIsValid(equation, {
    currIndex: currIndex + 1,
    currSum: currSum + currNum,
    isPartTwo,
  });

  if (!isPartTwo) {
    return isValidIfMultiplied || isValidIfAdded;
  }

  const isValidIfCombined = checkIfEquationIsValid(equation, {
    currIndex: currIndex + 1,
    currSum: Number.parseInt(`${currSum.toString()}${currNum.toString()}`),
    isPartTwo,
  });

  return isValidIfMultiplied || isValidIfAdded || isValidIfCombined;
};

export const partOne: SolutionFn = (input) => {
  const equations = getData(input);
  const validEquations: Equation[] = [];

  equations.forEach((equation) => {
    const isValid = checkIfEquationIsValid(equation, {
      currIndex: 1,
      currSum: equation.numbers[0]!,
      isPartTwo: false,
    });

    if (isValid) {
      validEquations.push(equation);
    }
  });

  return validEquations.reduce((acc, eq) => acc + eq.targetValue, 0).toString();
};

export const partTwo: SolutionFn = (input) => {
  const equations = getData(input);
  const validEquations: Equation[] = [];

  equations.forEach((equation) => {
    const isValid = checkIfEquationIsValid(equation, {
      currIndex: 1,
      currSum: equation.numbers[0]!,
      isPartTwo: true,
    });

    if (isValid) {
      validEquations.push(equation);
    }
  });

  return validEquations.reduce((acc, eq) => acc + eq.targetValue, 0).toString();
};
