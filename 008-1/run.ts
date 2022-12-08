const input = (await Deno.readTextFile("./input.txt"))
  .split("\n")
  .map((line) => Array.from(line).map((val) => parseInt(val, 10)));

// check if all the values in an array is smaller than the current
function allSmallerInRange(range: Array<number>, current: number) {
  return range.every((val) => val < current);
}

const count = input.reduce((outerCount, line, y) => {
  return (
    outerCount +
    line.reduce((count, current, x) => {
      const rangeLeft = line.slice(0, x);
      if (allSmallerInRange(rangeLeft, current)) return count + 1;

      const rangeRight = line.slice(x + 1);
      if (allSmallerInRange(rangeRight, current)) return count + 1;

      const rangeTop = input.slice(0, y).map((row) => row.at(x) ?? 0);
      if (allSmallerInRange(rangeTop, current)) return count + 1;

      const rangeBottom = input.slice(y + 1).map((row) => row.at(x) ?? 0);
      if (allSmallerInRange(rangeBottom, current)) return count + 1;

      // current tree is not visible from outside
      return count;
    }, 0)
  );
}, 0);

console.log(count);
