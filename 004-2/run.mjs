import fs from 'fs';

const data = (await fs.promises.readFile('./input.txt', 'utf8')).split('\n');

const final = data.reduce((prev, current) => {
  // early return for lines without values
  if (!current) return prev;

  const [area1, area2] = current.split(',');

  const [a1Small, a1Big] = area1.split('-').map(val => parseInt(val, 10));
  const [a2Small, a2Big] = area2.split('-').map(val => parseInt(val, 10));

  if (a1Small < a2Small)
    return prev + (a1Big >= a2Small ? 1 : 0);


  if (a1Small > a2Small)
    return prev + (a2Big >= a1Small ? 1 : 0);

  // a1Small === a2Small
  return prev + 1;
}, 0);

console.log(final);
