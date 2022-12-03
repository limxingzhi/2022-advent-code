import fs from 'fs';

const data = (await fs.promises.readFile('./input.txt', 'utf8')).split('\n');

const scoreOrder = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const scoreTable = new Map();

// populating the score table
Array.from(scoreOrder).map((char, index) => {
  scoreTable.set(char, index + 1);
})

// prev = [score, currentGroup]
const final = data.reduce(([score, group], current) => {
  if (!current) return [score, group];

  // group has 2 bags + current = 3, so we only care about the 3rd bag
  if (group.length < 2) return [score, [...group, current]];

  const bagSet1 = new Set(Array.from(group[0]));
  const bagSet2 = new Set(Array.from(group[1]));

  // literates through last array and see if repeated value exists in sets
  const foundChar = Array.from(current)
    .find((char) => bagSet1.has(char) && bagSet2.has(char));

  return [scoreTable.get(foundChar) + score, []];
}, [0, []]);

console.log(final[0])
