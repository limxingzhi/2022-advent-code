const input = (await Deno.readTextFile("./input.txt")).split("\n")[0];

const THRESHOLD_Q1 = 4;
const THRESHOLD_Q2 = 14;

function solve(threshold: number) {
  let ans = 0;
  const range: Array<string> = [];

  Array.from(input).find((item, index) => {
    range.push(item);
    if (new Set(range).size >= threshold) {
      ans = index + 1;
      return true;
    }
    if (range.length >= threshold) range.shift(); // pop from front
    return false;
  });

  return ans;
}

console.log("start of packet with 4: \t" + solve(THRESHOLD_Q1));
console.log("start of message with 4:\t" + solve(THRESHOLD_Q2));
