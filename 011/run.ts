// import { testMonkeys as monkeys, MonkeyType } from "./input.ts";
import { monkeys, MonkeyType } from "./input.ts";

// calculates the monkey business level
function getLevel(monkeys: Array<MonkeyType>): number {
  const sorted = [...monkeys].sort((a, b) =>
    a.inspectedCount < b.inspectedCount ? 1 : -1
  );

  return (
    (sorted.at(0)?.inspectedCount ?? 1) * (sorted.at(1)?.inspectedCount ?? 1)
  );
}

// prints debug information about the monkeys
function debugMonkeys(monkeys: Array<MonkeyType>) {
  monkeys.map((monkey, index) =>
    console.log(`${index} @ ${monkey.items} @ ${monkey.inspectedCount}`)
  );
}

function runRounds(
  rounds: number,
  minimizeWorryFn: (worryLevel: number) => number,
  debug?: boolean
): number {
  // deep clone the monkeys so the rounds are isolated
  const monkeysClone = monkeys.map((monkey) => ({
    ...monkey,
    items: [...monkey.items],
  }));

  // round counter
  let roundCounter = 0;

  // run 20 rounds
  while (roundCounter < rounds) {
    // iterate monkeys
    let monkeyIndex = 0;
    while (monkeyIndex < monkeysClone.length) {
      const { test, operation, items } = monkeysClone[monkeyIndex];

      // increment monkey inspected count
      monkeysClone[monkeyIndex].inspectedCount +=
        monkeysClone[monkeyIndex].items.length;

      // iterate through each item for one monkey, one round
      items.forEach((item) => {
        // get the worry level for the item after it has been decreased
        const worryLevel = minimizeWorryFn(operation(item));

        // figure out which monkey to receive that item
        const monkeyReceiverIndex = test(worryLevel);

        // throw over
        monkeysClone[monkeyReceiverIndex].items.push(worryLevel);
      });

      // remove items from current monkey
      monkeysClone[monkeyIndex].items = [];

      if (debug) {
        console.log("round", roundCounter);
        debugMonkeys(monkeysClone);
        console.log("\n");
      }

      monkeyIndex++;
    }

    roundCounter++;
  }

  return getLevel(monkeysClone);
}

function q1WorryFunction(worryLvl: number) {
  return Math.floor(worryLvl / 3);
}
console.log("q1", runRounds(20, q1WorryFunction));

// The idea of Q2 is that, 69 % 10 gives you the reminder of 9. It doesn't
// matter if your original number is 69 or (x*10 + 69) or (69 - x*10).
// And by applying that concept to mod every single test, we can get the remainder
// that is still useful for the operations. That's it. That's the whole trick
function q2WorryFunction(worryLvl: number) {
  return worryLvl % (17 * 3 * 5 * 7 * 11 * 19 * 2 * 13);
}
console.log("q2", runRounds(10_000, q2WorryFunction));
