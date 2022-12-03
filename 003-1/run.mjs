import fs from 'fs';

const data = (await fs.promises.readFile('./input.txt', 'utf8')).split('\n');

const scoreOrder = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const scoreTable = new Map();

// populating the score table
Array.from(scoreOrder).map((char, index) => {
  scoreTable.set(char, index + 1);
})

// output is nubmer
const final = data.reduce((prev, current) => {
  if (!current) return prev;

  const middle = current.length / 2; // string will always be even number

  // adds the LHS to a set
  const comparisonSet = new Set(
    Array.from(current.substring(0, middle))
  )

  // literates through RHS and see if repeated value exists in set
  const foundChar = Array.from(current.substring(middle)).find((char) => comparisonSet.has(char));

  return scoreTable.get(foundChar) + prev;
}, 0);

console.log(final)
