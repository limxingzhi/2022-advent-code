type Instruction = [string, number];

const input: Array<Instruction> = (await Deno.readTextFile("./input.txt"))
  .split("\n")
  .map((item) => {
    const arr = item.split(" ");
    return [arr[0], parseInt(arr.at(1) ?? "0", 10)];
  });

enum OperationEnum {
  ADDX = "addx",
  NOOP = "NOOP",
}

// returns the type of operation and the cycle count
function getOperation(operation: string): [OperationEnum, number] {
  if (operation === "addx") return [OperationEnum.ADDX, 2];
  if (operation === "noop") return [OperationEnum.NOOP, 1];
  throw new Error("INVALID OPERATION");
}

// get the row and column for the tube target
function getXY(cycleCount: number): [number, number] {
  return [Math.floor(cycleCount / 40), cycleCount % 40];
}

// get an array of positions for sprites
function getSpritePosition(position: number): Array<number> {
  const output: Array<number> = [];
  if (position > 0) output.push(position - 1);
  output.push(position);
  if (position < 39) output.push(position + 1);

  return output;
}

const registerXInitial = 1;

const screen: Array<string> = [];

// iterate the commands
input.reduce(
  ([cycleCount, registerX], [operation, operand]) => {
    const [operationType, cyclesToRun] = getOperation(operation);

    // get the column position of the sprite
    const spritePosition = getSpritePosition(registerX);

    let i = 0;
    while (i < cyclesToRun) {
      const [_row, col] = getXY(cycleCount + i);
      // draw the output as a single line, and then split later
      screen.push(spritePosition.includes(col) ? "#" : " ");
      i++;
    }

    if (operationType === OperationEnum.ADDX) {
      return [cycleCount + cyclesToRun, registerX + operand];
    }

    if (operationType === OperationEnum.NOOP) {
      return [cycleCount + cyclesToRun, registerX];
    }

    throw new Error("INVALID OPERATION");
  },
  [0, registerXInitial]
);

// print screen by splitting the entire line into 6 rows
const screenOutput = screen.reduce((output, current, index) => {
  if (index % 40 === 0) return output + "\n" + current;
  else return output + current;
}, "");
console.log(screenOutput);
