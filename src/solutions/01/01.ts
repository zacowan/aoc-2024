import type { SolutionFn } from "../../utils";

export const partOne: SolutionFn = (input) => {
  const leftList: number[] = [];
  const rightList: number[] = [];

  const lines = input.split("\n");
  lines.forEach((line) => {
    const res = /(\d+)\s*(\d+)/.exec(line);
    leftList.push(Number.parseInt(res!.at(1)!));
    rightList.push(Number.parseInt(res!.at(2)!));
  });

  leftList.sort();
  rightList.sort();

  let totalDistance = 0;

  for (let i = 0; i < leftList.length; i++) {
    const l = leftList[i]!;
    const r = rightList[i]!;

    totalDistance += Math.abs(l - r);
  }

  return totalDistance.toString();
};

export const partTwo: SolutionFn = (input) => {
  const leftList: number[] = [];
  const rightList: number[] = [];

  const lines = input.split("\n");
  lines.forEach((line) => {
    const res = /(\d+)\s*(\d+)/.exec(line);
    leftList.push(Number.parseInt(res!.at(1)!));
    rightList.push(Number.parseInt(res!.at(2)!));
  });

  const leftCounts = new Map<number, number>();
  const rightCounts = new Map<number, number>();

  leftList.forEach((v) => {
    leftCounts.set(v, (leftCounts.get(v) ?? 0) + 1);
  });

  rightList.forEach((v) => {
    rightCounts.set(v, (rightCounts.get(v) ?? 0) + 1);
  });

  let similarityScore = 0;

  leftList.forEach((v) => {
    const timesInRightList = rightCounts.get(v) ?? 0;
    similarityScore += v * timesInRightList;
  });

  return similarityScore.toString();
};
