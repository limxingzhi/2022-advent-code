const cratesRaw = (await Deno.readTextFile("./input-crates.txt")).split("\n");
// const movementRaw = (await Deno.readTextFile("./input-move-test.txt")).split(
const movementRaw = (await Deno.readTextFile("./input-movement.txt")).split(
  "\n"
);

/**
 * The general idea is to treat all of the creates as a stack,
 * so we have to first rotate it
 */

/**
 *
 * @param command one line of `move 2 from 1 to 6`
 * @returns [numberOfCrates, posFrom, posTo]
 */
function parseMovements(command: string): [number, number, number] {
  const stringNumbers = command
    .replace("move ", "")
    .replace("from ", "")
    .replace("to ", "")
    .split(" ");

  return stringNumbers.map((item) => parseInt(item, 10)) as [
    number,
    number,
    number
  ];
}

// rotating the stack
const stacks = cratesRaw.reduce((output, current) => {
  const packages = Array.from(current);

  packages.forEach((item, index) => {
    if (output.length === index) output.push([]);
    if (item !== "0") output[index].unshift(item);
  });

  return output;
}, [] as Array<Array<string>>);

// convert movements to numbers
const moves = movementRaw.map(parseMovements);

// move crates
moves.map(([count, from, to]) => {
  const temp = [];
  for (let i = count; i > 0; i--) {
    // remove item from stack while adding to temp, and preserving the order
    temp.unshift(stacks[from - 1].pop() as string);
  }
  stacks[to - 1] = [...stacks[to - 1], ...temp];
});

const ans = stacks.reduce((out, current) => {
  return (out += current.at(-1) as string);
}, "");

console.log(ans);
