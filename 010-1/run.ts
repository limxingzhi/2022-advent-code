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

// checks if the current cycle is within the signal strength range
function checkCycle(cycleCount: number): boolean {
  return (cycleCount - 20) % 40 === 0;
}

const registerXInitial = 1;

// iterate all commands
const q1 = input.reduce(
  ([cycleCount, registerX, signalStrength], [operation, operand]) => {
    const [operationType, cyclesToRun] = getOperation(operation);

    let newSignalStrength = signalStrength;

    // iterate the cycle within the commands
    let i = 1;
    while (i <= cyclesToRun) {
      if (checkCycle(cycleCount + i)) {
        newSignalStrength += (cycleCount + i) * registerX;
      }
      i++;
    }

    if (operationType === OperationEnum.ADDX) {
      return [cycleCount + cyclesToRun, registerX + operand, newSignalStrength];
    }

    if (operationType === OperationEnum.NOOP) {
      return [cycleCount + cyclesToRun, registerX, newSignalStrength];
    }

    throw new Error("INVALID OPERATION");
  },
  [0, registerXInitial, 0]
);

console.log("q1", q1[2]);
