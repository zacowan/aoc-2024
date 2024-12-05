import type { SolutionFn } from "../../utils";

type Matrix = string[][];

const getMatrix = (input: string): Matrix => {
  const matrix: Matrix = [];
  input.split("\n").forEach((line) => matrix.push(Array.from(line)));
  return matrix;
};

export const partOne: SolutionFn = (input) => {
  const matrix = getMatrix(input);
  let occurrences = 0;

  // Helper to check for "XMAS" starting from a given position
  const checkPattern = (
    i: number,
    j: number,
    di: number,
    dj: number,
  ): boolean => {
    const word = "XMAS";
    for (let k = 0; k < word.length; k++) {
      const x = i + k * di;
      const y = j + k * dj;
      if (
        x < 0 ||
        x >= matrix.length ||
        y < 0 ||
        y >= matrix[0]!.length ||
        matrix[x]![y] !== word[k]
      ) {
        return false;
      }
    }
    return true;
  };

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i]!.length; j++) {
      // Check horizontals
      if (checkPattern(i, j, 0, 1)) occurrences++; // Rightward
      if (checkPattern(i, j, 0, -1)) occurrences++; // Leftward

      // Check verticals
      if (checkPattern(i, j, 1, 0)) occurrences++; // Downward
      if (checkPattern(i, j, -1, 0)) occurrences++; // Upward

      // Check diagonals
      if (checkPattern(i, j, 1, 1)) occurrences++; // Down-right
      if (checkPattern(i, j, -1, -1)) occurrences++; // Up-left

      // Check anti-diagonals
      if (checkPattern(i, j, 1, -1)) occurrences++; // Down-left
      if (checkPattern(i, j, -1, 1)) occurrences++; // Up-right
    }
  }

  return occurrences.toString();
};

export const partTwo: SolutionFn = () => {
  return "-1";
};
