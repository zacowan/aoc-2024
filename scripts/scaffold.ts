import { z } from "zod";
import path from "path";
import Handlebars from "handlebars";
import { mkdir, readFile, writeFile } from "fs/promises";

const TEST_TEMPLATE_STRING = await readFile(
  path.join(import.meta.dirname, "./utils/test.handlebars"),
  "utf-8",
);
const TEST_TEMPLATE = Handlebars.compile(TEST_TEMPLATE_STRING);
const SOLUTION_TEMPLATE_STRING = await readFile(
  path.join(import.meta.dirname, "./utils/solution.handlebars"),
  "utf-8",
);
const SOLUTION_TEMPLATE = Handlebars.compile(SOLUTION_TEMPLATE_STRING);

const SOLUTIONS_DIR = path.join(import.meta.dirname, "../src/solutions");
const EXAMPLES_DIR = path.join(import.meta.dirname, "../data/examples");
const INPUTS_DIR = path.join(import.meta.dirname, "../data/inputs");

const argsSchema = z
  .array(z.string())
  .length(1)
  .transform((a) => {
    const day = a[0]!;
    const paddedDay = day.padStart(2, "0");
    return { day: Number.parseInt(day), paddedDay };
  });

const args = argsSchema.parse(process.argv.slice(2));

await writeFile(path.join(EXAMPLES_DIR, `${args.paddedDay}.txt`), "");
await writeFile(path.join(INPUTS_DIR, `${args.paddedDay}.txt`), "");

await mkdir(path.join(SOLUTIONS_DIR, args.paddedDay));
await writeFile(
  path.join(SOLUTIONS_DIR, `${args.paddedDay}/${args.paddedDay}.test.ts`),
  TEST_TEMPLATE({ day: args.day, paddedDay: args.paddedDay }),
);
await writeFile(
  path.join(SOLUTIONS_DIR, `${args.paddedDay}/${args.paddedDay}.ts`),
  SOLUTION_TEMPLATE({ day: args.day, paddedDay: args.paddedDay }),
);
