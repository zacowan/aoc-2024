import { readFile } from "fs/promises";
import path from "path";

const EXAMPLES_DIR = path.join(import.meta.dirname, "../data/examples");

export type SolutionFn = (input: string) => string;

/**
 * Reads the corresponding text file in the examples directory for the provided day and part, and returns it as a string.
 * @param day The day corresponding to the example
 * @param part If provided, will attempt to read example files with `"-n"` appended after the day, where `n` is the part.
 *
 * For example, for `day=2` and `part=2`, the following file will be read and returned as a string:
 *
 * ```
 * data/examples/02-2.txt
 * ```
 *
 * @returns content of the example
 */
export const readExample = async (day: number, part?: number) => {
  const paddedDay = day.toString().padStart(2, "0");
  const pathToExample =
    part !== undefined
      ? path.join(EXAMPLES_DIR, `${paddedDay}-${part.toString()}.txt`)
      : path.join(EXAMPLES_DIR, `${paddedDay}.txt`);
  return readFile(pathToExample, "utf-8");
};
