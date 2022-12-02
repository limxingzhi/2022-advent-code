import fs from 'fs';

const comparisonHashTable = new Map();

// A is rock = 1
// B is paper = 2
// C is scissors = 3

// Z = winning is 6
// X = losing is 0
// Y = draw is 3

comparisonHashTable.set('A X', 3 + 0);
comparisonHashTable.set('A Y', 1 + 3);
comparisonHashTable.set('A Z', 2 + 6);

comparisonHashTable.set('B X', 1 + 0);
comparisonHashTable.set('B Y', 2 + 3);
comparisonHashTable.set('B Z', 3 + 6);

comparisonHashTable.set('C X', 2 + 0);
comparisonHashTable.set('C Y', 3 + 3);
comparisonHashTable.set('C Z', 1 + 6);

const data = (await fs.promises.readFile('./input.txt', 'utf8')).split('\n');

// output is nubmer
const final = data.reduce((prev, current) => {
  return !comparisonHashTable.has(current)
    ? prev
    : prev + comparisonHashTable.get(current);
}, 0);

console.log(final);
