const input = (await Deno.readTextFile("./input.txt"))
  .split("\n")
  .map((line) => Array.from(line).map((val) => parseInt(val, 10)));

function getScore(range: Array<number>, current: number) {
  const trees = [...range];
  let score = 0;

  // run through the range
  while (trees.length > 0) {
    score++;
    const tree = trees.shift() ?? 0;
    if (tree >= current) break; // stop and return the score when a tree is unsuitable
  }

  return score;
}

const final = input.reduce((final, line, y) => {
  const outerScore = line.reduce((count, current, x) => {
    const scoreArr = [];

    // reverse from the left range because the current tree is on the right
    const rangeLeft = line.slice(0, x).reverse();
    scoreArr.push(getScore(rangeLeft, current));

    const rangeRight = line.slice(x + 1);
    scoreArr.push(getScore(rangeRight, current));

    // reverse from the top range because the current tree is on the right
    const rangeTop = input
      .slice(0, y)
      .map((row) => row.at(x) ?? 0) // pick the value at x and use that instead of the array
      .reverse();
    scoreArr.push(getScore(rangeTop, current));

    // pick the value at y and use that instead of the array
    const rangeBottom = input.slice(y + 1).map((row) => row.at(x) ?? 0);
    scoreArr.push(getScore(rangeBottom, current));

    // multiple the score
    const score = scoreArr.reduce((product, current) => product * current);

    // return the higher score
    return score > count ? score : count;
  }, 0);
  return outerScore > final ? outerScore : final;
}, 0);

console.log(final);
