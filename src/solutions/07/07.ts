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

export const partOne: SolutionFn = (input) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- TODO
  const equations = getData(input);
  const validEquations: Equation[] = [];

  return validEquations.reduce((acc, eq) => acc + eq.targetValue, 0).toString();
};

export const partTwo: SolutionFn = () => {
  return "-1";
};
