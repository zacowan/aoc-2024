import { describe, expect, test } from "vitest";
import { readExample } from "../../utils";
import { partOne, partTwo } from "./02";

test("part 1", async () => {
  const input = await readExample(2, 1);
  expect(partOne(input)).toEqual("2");
});

describe("part 2", () => {
  test("example 1 - official", async () => {
    const input = await readExample(2, 1);
    expect(partTwo(input)).toEqual("4");
  });

  test("example 2 - created, 2 numbers same at the start", async () => {
    const input = await readExample(2, 2);
    expect(partTwo(input)).toEqual("1");
  });

  test("example 3 - created, 2 numbers same at the end", async () => {
    const input = await readExample(2, 3);
    expect(partTwo(input)).toEqual("2");
  });
});
