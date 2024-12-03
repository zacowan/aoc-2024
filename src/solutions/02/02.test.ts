import { expect, test } from "vitest";
import { readExample } from "../../utils";
import { partOne, partTwo } from "./02";

test("part 1", async () => {
  const input = await readExample(2);
  expect(partOne(input)).toEqual("2");
});

test.todo("part 2", async () => {
  const input = await readExample(2);
  expect(partTwo(input)).toEqual("TODO");
});
