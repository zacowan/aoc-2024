import path from "path";
import { z } from "zod";
import type { SolutionFn } from "../src/utils";
import { readFile } from "fs/promises";

const SOLUTIONS_DIR = path.join(import.meta.dirname, "../src/solutions");
const INPUTS_DIR = path.join(import.meta.dirname, "../data/inputs");

const argsSchema = z
  .array(z.string())
  .length(1)
  .transform((a) => {
    const day = a[0]!;
    const paddedDay = day.padStart(2, "0");
    return { day: paddedDay };
  });

const args = argsSchema.parse(process.argv.slice(2));

const { partOne, partTwo } = (await import(
  path.join(SOLUTIONS_DIR, `${args.day}/${args.day}.ts`)
)) as {
  partOne: SolutionFn;
  partTwo: SolutionFn;
};
const input = await readFile(path.join(INPUTS_DIR, `${args.day}.txt`), "utf-8");

console.log("Part One: %s", partOne(input));
console.log("Part Two: %s", partTwo(input));
