const input: Array<[string, number]> = (await Deno.readTextFile("./input.txt"))
  .split("\n")
  .map((item) => {
    const arr = item.split(" ");
    return [arr[0], parseInt(arr[1])];
  });

// the x y position
type Position = [number, number];

// stringify the position for to use it as a key
function positionToString(input: Position): string {
  return input.join(",");
}

// returns position of tail and whether it moved or not
function getNewTailPos(
  newHeadPos: Position,
  oldTailPos: Position
): [Position, boolean] {
  // check if new head is touching old tail
  const isTouching: boolean =
    newHeadPos[0] - oldTailPos[0] <= 1 &&
    newHeadPos[0] - oldTailPos[0] >= -1 &&
    newHeadPos[1] - oldTailPos[1] <= 1 &&
    newHeadPos[1] - oldTailPos[1] >= -1;

  // no need to move tail
  if (isTouching) return [oldTailPos, false];

  // is same col
  if (newHeadPos[0] === oldTailPos[0]) {
    const moveTop = newHeadPos[1] - oldTailPos[1] > 0;
    return moveTop
      ? [[oldTailPos[0], oldTailPos[1] + 1], true]
      : [[oldTailPos[0], oldTailPos[1] - 1], true];
  }

  // is same row
  if (newHeadPos[1] === oldTailPos[1]) {
    const moveRight = newHeadPos[0] - oldTailPos[0] > 0;
    return moveRight
      ? [[oldTailPos[0] + 1, oldTailPos[1]], true]
      : [[oldTailPos[0] - 1, oldTailPos[1]], true];
  }

  // move diagonal

  const moveRight = newHeadPos[0] - oldTailPos[0] > 0;
  const moveLeft = newHeadPos[0] - oldTailPos[0] < 0;
  const moveTop = newHeadPos[1] - oldTailPos[1] > 0;
  const moveBottom = newHeadPos[1] - oldTailPos[1] < 0;

  // move top right
  if (moveRight && !moveLeft && moveTop && !moveBottom)
    return [[oldTailPos[0] + 1, oldTailPos[1] + 1], true];
  // move top left
  if (!moveRight && moveLeft && moveTop && !moveBottom)
    return [[oldTailPos[0] - 1, oldTailPos[1] + 1], true];
  // move bottom right
  if (moveRight && !moveLeft && !moveTop && moveBottom)
    return [[oldTailPos[0] + 1, oldTailPos[1] - 1], true];
  // move bottom left
  if (!moveRight && moveLeft && !moveTop && moveBottom)
    return [[oldTailPos[0] - 1, oldTailPos[1] - 1], true];

  console.error(moveTop, moveBottom, moveLeft, moveRight);
  throw new Error("butt");
}

function getNewHeadPos(currentHeadPos: Position, dir: string): Position {
  switch (dir) {
    case "L": // move left
      return [currentHeadPos[0] - 1, currentHeadPos[1]];
    case "R": // move right
      return [currentHeadPos[0] + 1, currentHeadPos[1]];
    case "U": // move top
      return [currentHeadPos[0], currentHeadPos[1] + 1];
    case "D": // move down
      return [currentHeadPos[0], currentHeadPos[1] - 1];
    default:
      return currentHeadPos;
  }
}

// the idea is, instead of using 2 positions, use an array of positions
function moveRope(rope: Array<Position>): number {
  const positionSet = new Set<string>();

  // add the starting position to the set
  positionSet.add(positionToString([0, 0]));

  // go through line
  input.forEach(([direction, moves]) => {
    // move one move at a time
    let i = 0;
    while (i < moves) {
      rope[0] = getNewHeadPos(rope[0], direction);

      let currentRopeIndex = 1;
      while (currentRopeIndex <= rope.length - 1) {
        const headPos = rope[currentRopeIndex - 1];
        const tailPos = rope[currentRopeIndex];

        // get the new tail position and if we need to move it
        const [newTail, tailMoved] = getNewTailPos(headPos, tailPos);
        if (tailMoved) {
          // set the new tail position
          rope[currentRopeIndex] = newTail;
        }
        currentRopeIndex++;
      }
      i++;

      // adding to a set means we dont need to care about repeats
      positionSet.add(positionToString(rope.at(rope.length - 1) ?? [0, 0]));
    }
  });

  return positionSet.size;
}

const rope1: Array<Position> = new Array(2).fill([0, 0]);
const rope2: Array<Position> = new Array(10).fill([0, 0]);

console.log("q1", moveRope(rope1));
console.log("q2", moveRope(rope2));
