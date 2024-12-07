import type { SolutionFn } from "../../utils";

interface PageOrderRule {
  targetNumber: number;
  mustComeBeforeNumber: number;
}

const pageOrderRuleRegex = /\d+\|\d+/g;

const getData = (
  input: string,
): { pageOrderRules: PageOrderRule[]; updates: number[][] } => {
  const pageOrderRules: PageOrderRule[] = [];
  const updates: number[][] = [];

  const pageOrderRuleMatches = input.matchAll(pageOrderRuleRegex);

  for (const match of pageOrderRuleMatches) {
    const [left, right] = match[0].split("|");
    pageOrderRules.push({
      targetNumber: Number.parseInt(right!),
      mustComeBeforeNumber: Number.parseInt(left!),
    });
  }

  const updatesLines = input.split("\n\n")[1]!.split("\n");
  for (const line of updatesLines) {
    updates.push(line.split(",").map((n) => Number.parseInt(n)));
  }

  return {
    pageOrderRules,
    updates,
  };
};

const getPageOrderRulesMap = (
  pageOrderRules: PageOrderRule[],
): Map<number, number[]> => {
  const pageOrderRulesMap = new Map<number, number[]>();
  pageOrderRules.forEach((rule) => {
    pageOrderRulesMap.set(rule.targetNumber, [
      ...(pageOrderRulesMap.get(rule.targetNumber) ?? []),
      rule.mustComeBeforeNumber,
    ]);
  });
  return pageOrderRulesMap;
};

export const partOne: SolutionFn = (input) => {
  /**
   * Assumption: numbers in each update are unique (no dupes)
   *
   * Hash map for page ordering rules:
   * - key: target number
   * - value: array of numbers that must come before it
   *
   * for each update:
   * - store the index of each number in a hash map
   * - for each number in the update:
   *   - evaluate the page ordering rules for the number:
   *     - check that numbers come before it, or that they don't exist in the update
   */
  const { pageOrderRules, updates } = getData(input);

  const pageOrderRulesMap = getPageOrderRulesMap(pageOrderRules);

  const validUpdates: number[][] = [];

  updates.forEach((update) => {
    let isValidUpdate = true;
    const updateOrder = new Map<number, number>();
    update.forEach((num, i) => updateOrder.set(num, i));

    update.forEach((num, i) => {
      const numbersThatMustComeBefore = pageOrderRulesMap.get(num);

      if (!numbersThatMustComeBefore) {
        return;
      }

      numbersThatMustComeBefore.forEach((numThatComesBefore) => {
        if (
          updateOrder.get(numThatComesBefore) !== undefined &&
          updateOrder.get(numThatComesBefore)! > i
        ) {
          isValidUpdate = false;
        }
      });
    });

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- false positive
    if (isValidUpdate) {
      validUpdates.push(update);
    }
  });

  return validUpdates
    .reduce((acc, update) => {
      return acc + update[Math.floor(update.length / 2)]!;
    }, 0)
    .toString();
};

export const partTwo: SolutionFn = (input) => {
  const { pageOrderRules, updates } = getData(input);

  const pageOrderRulesMap = getPageOrderRulesMap(pageOrderRules);

  const invalidUpdates: number[][] = [];

  updates.forEach((update) => {
    let isValidUpdate = true;
    const updateOrder = new Map<number, number>();
    update.forEach((num, i) => updateOrder.set(num, i));

    update.forEach((num, i) => {
      const numbersThatMustComeBefore = pageOrderRulesMap.get(num);

      if (!numbersThatMustComeBefore) {
        return;
      }

      numbersThatMustComeBefore.forEach((numThatComesBefore) => {
        if (
          updateOrder.get(numThatComesBefore) !== undefined &&
          updateOrder.get(numThatComesBefore)! > i
        ) {
          isValidUpdate = false;
        }
      });
    });

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- false positive
    if (!isValidUpdate) {
      invalidUpdates.push(update);
    }
  });

  const sortedInvalidUpdates = invalidUpdates.map((update) => {
    const updateOrder = new Map<number, number>();
    update.forEach((num, i) => updateOrder.set(num, i));

    update.sort((a, b) => {
      const numbersThatMustComeBeforeB = pageOrderRulesMap.get(b);

      if (numbersThatMustComeBeforeB?.includes(a)) {
        return -1;
      } else {
        return 1;
      }
    });

    return update;
  });

  return sortedInvalidUpdates
    .reduce((acc, update) => {
      return acc + update[Math.floor(update.length / 2)]!;
    }, 0)
    .toString();
};
