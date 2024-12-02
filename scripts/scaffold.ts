import { z } from "zod";
import path from "path";
// import { compile } from "handlebars";
import { writeFile } from "fs/promises";

const SOLUTIONS_DIR = path.join(import.meta.dirname, "../src/solutions");
const EXAMPLES_DIR = path.join(import.meta.dirname, "../data/examples");
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

const templateContent = "";

await writeFile(path.join(EXAMPLES_DIR, `${args.day}.txt`), "");
await writeFile(path.join(INPUTS_DIR, `${args.day}.txt`), "");
await writeFile(path.join(SOLUTIONS_DIR, `${args.day}.ts`), templateContent);
