type Coordinate = [number, number];
const start: Coordinate = [0, 0];

// format input into 2D char array
const grid = (await Deno.readTextFile("./input.txt"))
  .split("\n")
  .map((item, xPos) => {
    return Array.from(item).map((char, yPos) => {
      if (char === "E") {
        start[0] = xPos;
        start[1] = yPos;
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
  const startChar = getPositionChar(from) === "E" ? "z" : getPositionChar(from);
  const endChar = getPositionChar(to) === "S" ? "a" : getPositionChar(to);

  // cannot move back to a previous position
  if (history.has(positionToString(to))) return false;

  // cannot go back to start
  if (endChar === "E") return false;

  // checks char code and returns accordingly
  const heightDiff = endChar.charCodeAt(0) - startChar.charCodeAt(0);
  if (heightDiff >= -1) return true;
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

// shows visited nodes when there is an exception
function debugGrid(visited: Set<string>) {
  grid.map((row, x) => {
    const rowStr = row
      .map((cell, y) => {
        return visited.has(positionToString([x, y]))
          ? cell
          : " ";
      })
      .join("");
    console.log(rowStr);
  });
}

function execute() {
  const visited = new Set<string>();
  const queue: Array<Node> = [
    {
      position: [start[0], start[1]],
      history: new Set(),
    },
  ];

  // BFS
  while (true) {
    const candidate = queue.shift();
    if (candidate === undefined) {
      debugGrid(visited);
      throw new Error("Empty queue");
    }

    // ignore current node if it was visited
    if (visited.has(positionToString(candidate.position))) continue;
    else visited.add(positionToString(candidate.position));

    if (getPositionChar(candidate.position) === "a") {
      return candidate.history.size;
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

console.log(execute());
