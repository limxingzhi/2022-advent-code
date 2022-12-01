import fs from 'fs';

const data = (await fs.promises.readFile('./input.txt', 'utf8')).split('\n');

// output is [current value, max value]
const final = data.reduce(([currentValue, maxValue], current) => {
  if (current === '') {
    // compare currentvalue and compare to max
    return (currentValue > maxValue)
      ? [0, currentValue]
      : [0, maxValue];
  } else {
    const num = parseInt(current, 10);
    return [currentValue += num, maxValue];
  }
}, [0, 0]);

console.log(final[1]);