import type { SolutionFn } from "../../utils";

type Matrix = string[][];

const getMatrix = (input: string): Matrix => {
  const matrix: Matrix = [];
  input.split("\n").forEach((line) => matrix.push(Array.from(line)));
  return matrix;
};

const checkPattern = ({
  word,
  matrix,
  i,
  j,
  di,
  dj,
}: {
  word: string;
  matrix: Matrix;
  i: number;
  j: number;
  di: number;
  dj: number;
}): boolean => {
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

export const partOne: SolutionFn = (input) => {
  const matrix = getMatrix(input);
  const word = "XMAS";
  let occurrences = 0;

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i]!.length; j++) {
      if (checkPattern({ word, matrix, i, j, di: 0, dj: 1 })) occurrences++; // Rightward
      if (checkPattern({ word, matrix, i, j, di: 0, dj: -1 })) occurrences++; // Leftward
      if (checkPattern({ word, matrix, i, j, di: 1, dj: 0 })) occurrences++; // Downward
      if (checkPattern({ word, matrix, i, j, di: -1, dj: 0 })) occurrences++; // Upward
      if (checkPattern({ word, matrix, i, j, di: 1, dj: 1 })) occurrences++; // Down-right
      if (checkPattern({ word, matrix, i, j, di: -1, dj: -1 })) occurrences++; // Up-left
      if (checkPattern({ word, matrix, i, j, di: 1, dj: -1 })) occurrences++; // Down-left
      if (checkPattern({ word, matrix, i, j, di: -1, dj: 1 })) occurrences++; // Up-right
    }
  }

  return occurrences.toString();
};

export const partTwo: SolutionFn = (input) => {
  const matrix = getMatrix(input);
  let occurrences = 0;

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i]!.length; j++) {
      /// Check diagonal "MAS" (down-right from the center)
      const downRight = checkPattern({
        word: "MAS",
        matrix,
        i: i - 1,
        j: j - 1,
        di: 1,
        dj: 1,
      });

      // Check diagonal "MAS" (up-left from the center)
      const upLeft = checkPattern({
        word: "MAS",
        matrix,
        i: i + 1,
        j: j + 1,
        di: -1,
        dj: -1,
      });

      // Check anti-diagonal "MAS" (down-left from the center)
      const downLeft = checkPattern({
        word: "MAS",
        matrix,
        i: i - 1,
        j: j + 1,
        di: 1,
        dj: -1,
      });

      // Check anti-diagonal "MAS" (up-right from the center)
      const upRight = checkPattern({
        word: "MAS",
        matrix,
        i: i + 1,
        j: j - 1,
        di: -1,
        dj: 1,
      });

      // If both diagonal and anti-diagonal match, we found a cross
      if ((downRight || upLeft) && (downLeft || upRight)) {
        occurrences++;
      }
    }
  }

  return occurrences.toString();
};
