/* eslint-disable @typescript-eslint/no-unsafe-member-access -- allow calling vitest functions which can error */
/* eslint-disable @typescript-eslint/no-unsafe-call -- allow calling vitest functions which can error */
import { expect, test } from "vitest";
import { readExample } from "../../utils";
import { partOne, partTwo } from "./01";

test("part 1", async () => {
  const input = await readExample(1);
  expect(partOne(input)).toEqual("11");
});

test("part 2", async () => {
  const input = await readExample(1);
  expect(partTwo(input)).toEqual("31");
});
