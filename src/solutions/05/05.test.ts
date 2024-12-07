import { expect, test } from "vitest";
import { readExample } from "../../utils";
import { partOne, partTwo } from "./05";

test("part 1", async () => {
  const input = await readExample(5);
  expect(partOne(input)).toEqual("143");
});

// Remove the `.todo` to tell vitest to execute this test
test.todo("part 2", async () => {
  const input = await readExample(5);
  expect(partTwo(input)).toEqual("TODO");
});
