type Coordinate = [number, number];
const startingPoints: Array<Coordinate> = [];

// format input into 2D char array
const grid = (await Deno.readTextFile("./input.txt"))
  .split("\n")
  .map((item, xPos) => {
    return Array.from(item).map((char, yPos) => {
      if (char === "S" || char === "a") {
        startingPoints.push([xPos, yPos]);
        return "a";
      }
      return char;
    });
  });

// position stringify function for set key
function positionToString(position: Coordinate): string {
  return position.join(",");
}

// check if we can move according to height difference
function canMove(
  from: Coordinate,
  to: Coordinate,
  history: Set<string>
): boolean {
  const startChar = getPositionChar(from) === "S" ? "a" : getPositionChar(from);
  const endChar = getPositionChar(to) === "E" ? "z" : getPositionChar(to);

  // cannot move back to a previous position
  if (history.has(positionToString(to))) return false;

  // cannot go back to start
  if (endChar === "S") return false;

  // checks char code and returns accordingly
  const heightDiff = endChar.charCodeAt(0) - startChar.charCodeAt(0);
  if (heightDiff <= 1) return true;
  return false;
}

// convert coordinate to character in grid
function getPositionChar(position: Coordinate): string {
  const val = grid.at(position[0])?.at(position[1]) ?? "";
  if (!val) throw new Error("invalid position value " + position + val);
  return val;
}

// get neighors on the grid
function getNeighbors([x, y]: Coordinate): Array<Coordinate> {
  const output: Array<Coordinate> = [];
  if (grid[x + 1] !== undefined) output.push([x + 1, y]); // can go right
  if (grid[x - 1] !== undefined) output.push([x - 1, y]); // can go left
  if (grid[x][y + 1] !== undefined) output.push([x, y + 1]); // can go up
  if (grid[x][y - 1] !== undefined) output.push([x, y - 1]); // can go down

  return output;
}

interface Node {
  position: Coordinate;
  history: Set<string>;
}

let shortest = Infinity;

async function execute(startNode: Coordinate) {
  const visited = new Set<string>();
  const queue: Array<Node> = [
    {
      position: startNode,
      history: new Set(),
    },
  ];

  // BFS
  while (true) {
    const candidate = queue.shift();

    // current path is invalid
    if (candidate === undefined) {
      return await Infinity;
    }

    // ignore current node if it was visited
    if (visited.has(positionToString(candidate.position))) continue;
    else visited.add(positionToString(candidate.position));

    // ignore node if it is longer than the current shortest path
    // in reality, the performance for this doesn't help much
    if (candidate.history.size >= shortest) continue;

    if (getPositionChar(candidate.position) === "E") {
      shortest =
        candidate.history.size < shortest ? candidate.history.size : shortest;
      return await candidate.history.size;
    }

    // get negihbors that are movable
    const movablePositions = getNeighbors(candidate.position).filter((pos) =>
      canMove(candidate.position, pos, candidate.history)
    );

    // add valid neighbors into queue
    movablePositions.forEach((pos) => {
      const newNode: Node = {
        position: pos,
        history: new Set<string>(),
      };
      newNode.history.add(positionToString(candidate.position));
      Array.from(candidate.history).forEach((hisPos) =>
        newNode.history.add(hisPos)
      );
      queue.push(newNode);
    });
  }
}

const val = (await Promise.all(startingPoints.map(execute))).reduce(
  (prev, current) => {
    return Math.min(prev, current);
  },
  Infinity
);

console.log(val);
