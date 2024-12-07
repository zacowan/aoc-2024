import { expect, test } from "vitest";
import { readExample } from "../../utils";
import { partOne, partTwo } from "./05";

test("part 1", async () => {
  const input = await readExample(5);
  expect(partOne(input)).toEqual("143");
});

test("part 2", async () => {
  const input = await readExample(5);
  expect(partTwo(input)).toEqual("123");
});
