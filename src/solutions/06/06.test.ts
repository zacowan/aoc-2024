import { expect, test } from "vitest";
import { readExample } from "../../utils";
import { partOne, partTwo } from "./06";

test("part 1", async () => {
  const input = await readExample(6);
  expect(partOne(input)).toEqual("41");
});

test("part 2", async () => {
  const input = await readExample(6);
  expect(partTwo(input)).toEqual("6");
});
