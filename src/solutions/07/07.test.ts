import { expect, test } from "vitest";
import { readExample } from "../../utils";
import { partOne, partTwo } from "./07";

test("part 1", async () => {
  const input = await readExample(7);
  expect(partOne(input)).toEqual("3749");
});

test("part 2", async () => {
  const input = await readExample(7);
  expect(partTwo(input)).toEqual("11387");
});
