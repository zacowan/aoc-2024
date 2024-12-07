import { expect, test } from "vitest";
import { readExample } from "../../utils";
import { partOne, partTwo } from "./07";

test("part 1", async () => {
  const input = await readExample(7);
  expect(partOne(input)).toEqual("3749");
});

// Remove the `.todo` to tell vitest to execute this test
test.todo("part 2", async () => {
  const input = await readExample(7);
  expect(partTwo(input)).toEqual("TODO");
});
