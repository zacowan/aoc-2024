import type { SolutionFn } from "../../utils";

const BLOCKED = "#";
const OPEN = ".";
const GUARD = "^";
const DIRECTIONS = {
  UP: [-1, 0],
  DOWN: [1, 0],
  LEFT: [0, -1],
  RIGHT: [0, 1],
} as const;
type Direction = (typeof DIRECTIONS)[keyof typeof DIRECTIONS];

const getData = (input: string) => {
  const grid = input.split("\n").map((line) => [...line]);
  let startRow = 0;
  let startCol = 0;
  grid.forEach((row, i) => {
    row.forEach((cell, j) => {
      if (cell === GUARD) {
        startRow = i;
        startCol = j;
      }
    });
  });
  grid[startRow]![startCol] = OPEN;
  return {
    grid,
    startRow,
    startCol,
  };
};

const getNewDirection = (direction: Direction): Direction => {
  if (direction === DIRECTIONS.UP) {
    return DIRECTIONS.RIGHT;
  } else if (direction === DIRECTIONS.RIGHT) {
    return DIRECTIONS.DOWN;
  } else if (direction === DIRECTIONS.DOWN) {
    return DIRECTIONS.LEFT;
  } else {
    return DIRECTIONS.UP;
  }
};

export const partOne: SolutionFn = (input) => {
  const { grid, startRow, startCol } = getData(input);

  let i = startRow;
  let j = startCol;
  let dir: Direction = DIRECTIONS.UP;
  const visited = new Set<string>();

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- false positive
  while (true) {
    visited.add(JSON.stringify([i, j]));

    const nextI = i + dir[0];
    const nextJ = j + dir[1];

    if (
      nextI < 0 ||
      nextI >= grid.length ||
      nextJ < 0 ||
      nextJ >= grid.length
    ) {
      break;
    }

    const nextCell = grid[nextI]![nextJ]!;

    if (nextCell === OPEN) {
      i = nextI;
      j = nextJ;
    } else {
      dir = getNewDirection(dir);
    }
  }

  return visited.size.toString();
};

export const partTwo: SolutionFn = (input) => {
  const { grid, startRow, startCol } = getData(input);

  let possibleObstructionsWhichCreateCycle = 0;

  for (let obstructionI = 0; obstructionI < grid.length; obstructionI++) {
    for (
      let obstructionJ = 0;
      obstructionJ < grid[obstructionI]!.length;
      obstructionJ++
    ) {
      const obstructedCell = grid[obstructionI]![obstructionJ];
      if (
        obstructedCell === BLOCKED ||
        (obstructionI === startRow && obstructionJ === startCol)
      ) {
        continue;
      }

      const gridClone = structuredClone(grid);
      gridClone[obstructionI]![obstructionJ] = BLOCKED;

      let i = startRow;
      let j = startCol;
      let dir: Direction = DIRECTIONS.UP;
      const visitedWithDir = new Set<string>();

      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- false positive
      while (true) {
        // TODO: this is not how you detect a cycle
        if (visitedWithDir.has(JSON.stringify([i, j, dir]))) {
          possibleObstructionsWhichCreateCycle += 1;
          break;
        }
        visitedWithDir.add(JSON.stringify([i, j, dir]));

        const nextI = i + dir[0];
        const nextJ = j + dir[1];

        if (
          nextI < 0 ||
          nextI >= gridClone.length ||
          nextJ < 0 ||
          nextJ >= gridClone.length
        ) {
          break;
        }

        const nextCell = gridClone[nextI]![nextJ]!;

        if (nextCell === OPEN) {
          i = nextI;
          j = nextJ;
        } else {
          dir = getNewDirection(dir);
        }
      }
    }
  }

  return possibleObstructionsWhichCreateCycle.toString();
};
