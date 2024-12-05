import { expect, test } from "vitest";
import { readExample } from "../../utils";
import { partOne, partTwo } from "./03";

test("part 1", async () => {
  const input = await readExample(3);
  expect(partOne(input)).toEqual("161");
});

test("part 2", async () => {
  const input = await readExample(3);
  expect(partTwo(input)).toEqual("48");
});
