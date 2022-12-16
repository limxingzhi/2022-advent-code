type Coordinate = [number, number];

const gridSize: Coordinate = [0, 0];

// const paths: Array<Array<Coordinate>> = (await Deno.readTextFile("./test.txt"))
  const paths: Array<Array<Coordinate>> = (await Deno.readTextFile("./input.txt"))
  .split("\n")
  .map((path) => {
    const points = path.split(" -> ");
    return points.map((point): Coordinate => {
      const xy = point.split(",");
      const x = parseInt(xy[0], 10);
      const y = parseInt(xy[1], 10);
      gridSize[0] = Math.max(x, gridSize[0]);
      gridSize[1] = Math.max(y, gridSize[1]);
      return [x, y];
    });
  });

function coordinateToString(point: Coordinate): string {
  return point.join(",");
}

enum SandPath {
  ROCK = "ROCK",
  SAND = "SAND",
}
const gridCache = new Map<string, SandPath>();

paths.forEach((path) => {
  path.reduce((prev, current) => {
    if (prev[1] === current[1]) {
      // move along x axis
      let iterator = prev[0]; // sets the first point to move

      if (prev[0] < current[0])
        // move right
        while (iterator <= current[0]) {
          gridCache.set(
            coordinateToString([iterator, current[1]]),
            SandPath.ROCK
          );
          iterator += 1;
        }

      if (prev[0] > current[0])
        // move left
        while (iterator >= current[0]) {
          gridCache.set(
            coordinateToString([iterator, current[1]]),
            SandPath.ROCK
          );
          iterator -= 1;
        }
    } else {
      // move along y axis
      let iterator = prev[1]; // sets the first point to move
      while (iterator <= current[1]) {
        gridCache.set(
          coordinateToString([current[0], iterator]),
          SandPath.ROCK
        );
        iterator += 1; // will always move downwards
      }
    }
    return [...current] as Coordinate;
  });
});

function moveSand(sandCurrentPos: Coordinate): boolean {
  const [x, y] = sandCurrentPos;
  const newY = y + 1;

  const possibleX =
    x === 0
      ? [0, 0 + 1] // x at the left corner, so return 0 or 1
      : x === gridSize[0] // x is at the right corner
      ? [x, x - 1] // return x and the next try, left to x
      : [x, x - 1, x + 1]; // return x, next try x to left, and then x t oright

  const newX = possibleX.find((maybeX) => {
    return !gridCache.has(coordinateToString([maybeX, newY]));
  });

  if (newX !== undefined) {
    // we can move it down

    if (newY >= gridSize[1]) {
      // fell off the bottom
      return false;
    } else {
      // continue falling
      return moveSand([newX, newY]);
    }
  }
  // we cannot move it down
  else {
    // hit something ; cannot move down
    gridCache.set(coordinateToString([x, y]), SandPath.SAND);
    return true;
  }
}

let move = true;
while (move) move = moveSand([500, 0]);

function getSandCount() {
  return Array.from(gridCache.values()).filter(
    (sandPath) => sandPath === SandPath.SAND
  ).length;
}

console.log(Array.from(gridCache.entries()));
console.log(getSandCount());
