import { expect, test } from "vitest";
import { readExample } from "../../utils";
import { partOne, partTwo } from "./04";

test("part 1", async () => {
  const input = await readExample(4);
  expect(partOne(input)).toEqual("18");
});

// Remove the `.todo` to tell vitest to execute this test
test.todo("part 2", async () => {
  const input = await readExample(4);
  expect(partTwo(input)).toEqual("TODO");
});
