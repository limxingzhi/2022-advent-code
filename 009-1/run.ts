// clean the input into an array of directions and moves
const input: Array<[string, number]> = (await Deno.readTextFile("./input.txt"))
  .split("\n")
  .map((item) => {
    const arr = item.split(" ");
    return [arr[0], parseInt(arr[1])];
  });

const positionSet = new Set<string>();

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

// current head/tail positions
const headPos: Position = [0, 0];
const tailPos: Position = [0, 0];

// add the starting position to the set
positionSet.add(positionToString(tailPos));

// go through line
input.forEach(([direction, moves]) => {
  let i = 0;

  // move one move at a time
  while (i < moves) {
    const newHead = getNewHeadPos(headPos, direction);

    // get the new tail position and if we need to move it
    const [newTail, tailMoved] = getNewTailPos(newHead, tailPos);
    if (tailMoved) {
      // adding to a set means we dont need to care about repeats
      positionSet.add(positionToString(newTail));

      // set the new tail position
      tailPos[0] = newTail[0];
      tailPos[1] = newTail[1];
    }

    headPos[0] = newHead[0];
    headPos[1] = newHead[1];

    i++;
  }
});

console.log(positionSet.size);
