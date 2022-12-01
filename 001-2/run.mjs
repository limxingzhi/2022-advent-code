import fs from 'fs';

const compareMaxAndReplace = (currentValue, arr) => {
  const currentNum = parseInt(currentValue, 10);

  if (currentNum > arr[2])
    return [arr[1], arr[2], currentNum];

  if (currentNum > arr[1])
    return [arr[1], currentNum, arr[2]]

  if (currentNum > arr[0])
    return [currentNum, arr[1], arr[2]];

  return arr;
}

const data = (await fs.promises.readFile('./input.txt', 'utf8')).split('\n');

// output is [current value, [max1, max2, max3]]
const final = data.reduce(([currentValue, maxValues], current) => {
  if (current === '') {
    return [0, compareMaxAndReplace(currentValue, maxValues)];
  } else {
    const num = parseInt(current, 10);
    return [currentValue + num, maxValues];
  }
}, [0, [0, 0, 0]]);

console.log(final[1][0] + final[1][1] + final[1][2]);
console.log(final[1][0], final[1][1], final[1][2]);