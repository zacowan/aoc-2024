import { readFile } from "fs/promises";
import path from "path";

const EXAMPLES_DIR = path.join(import.meta.dirname, "../data/examples");

export type SolutionFn = (input: string) => string;

export const readExample = async (day: number) => {
  const content = await readFile(
    path.join(EXAMPLES_DIR, `${day.toString().padStart(2, "0")}.txt`),
    "utf-8",
  );
  return content;
};
