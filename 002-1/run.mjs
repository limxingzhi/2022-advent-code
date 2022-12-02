import fs from 'fs';

const comparisonHashTable = new Map();

// A or X is rock = 1
// B or Y is paper = 2
// C or Z is scissors = 3

// winning is 6
// losing is 0
// draw is 3

comparisonHashTable.set('A X', 1 + 3);
comparisonHashTable.set('A Y', 2 + 6);
comparisonHashTable.set('A Z', 3 + 0);

comparisonHashTable.set('B X', 1 + 0);
comparisonHashTable.set('B Y', 2 + 3);
comparisonHashTable.set('B Z', 3 + 6);

comparisonHashTable.set('C X', 1 + 6);
comparisonHashTable.set('C Y', 2 + 0);
comparisonHashTable.set('C Z', 3 + 3);

const data = (await fs.promises.readFile('./input.txt', 'utf8')).split('\n');

// output is nubmer
const final = data.reduce((prev, current) => {
  return !comparisonHashTable.has(current)
    ? prev
    : prev + comparisonHashTable.get(current);
}, 0);

console.log(final);
