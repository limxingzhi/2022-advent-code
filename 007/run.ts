const input = (await Deno.readTextFile("./input.txt")).split("\n");

enum LineType {
  CMD_CD_UP,
  CMD_CD_DOWN,
  DIR,
  LS,
  FILE,
}

function identifyLine(line: string): LineType {
  if (line.startsWith("$ cd ..")) return LineType.CMD_CD_UP;
  if (line.startsWith("$ cd ")) return LineType.CMD_CD_DOWN;
  if (line.startsWith("$ ls")) return LineType.LS;
  if (line.startsWith("dir ")) return LineType.DIR;
  return LineType.FILE;
}

// convert the array of paths into a string
function pwdToString(pwd: Array<string>): string {
  const name = pwd.join("/").substring(1);
  return name.length > 0 ? name : "/";
}

// get the size of the file from the current line
function getFileSize(line: string): number {
  const firstItem = line.split(" ")[0];
  return parseInt(firstItem, 10);
}

// a hashmap where key = path, value = size
const directorySizeTable = new Map<string, number>();

// current working directory as an array of strings
const pwd: Array<string> = [];

// iterate through all lines
input.forEach((line) => {
  const lineType = identifyLine(line);

  // LS and DIR has no use in this approach
  // not using switch because not a great practice to declare new variables in a switch case scope
  if (lineType === LineType.CMD_CD_UP)
    pwd.pop(); // remove the latest path from pwd
  else if (lineType === LineType.CMD_CD_DOWN)
    pwd.push(line.replace("$ cd ", "")); // add the latest path to pwd
  else if (lineType === LineType.FILE) {
    // iterate through the pwd and add the file size to every entry
    pwd.reduce((path, current) => {
      const newPath = [...path, current];
      const pathString = pwdToString(newPath);

      // get the current size of the current directory
      const val = directorySizeTable.get(pathString) ?? 0;

      // add the size of the current file to the directory
      directorySizeTable.set(pathString, val + getFileSize(line));
      return newPath;
    }, [] as Array<string>);
  }
});

// Q1 : add all of the values that are under 100000
const q1 = Array.from(directorySizeTable.values()).reduce((prev, current) => {
  return current > 100000 ? prev : prev + current;
}, 0);
console.log("q1: ", q1);

// Q2 : identify the smallest size that is under the required size
// minus the size of the root dir from the disk space
const sizeLeft = 70000000 - (directorySizeTable.get("/") ?? 0);

// how much size we need to clear for the update
const sizeRequired = 30000000 - sizeLeft;
const q2 = Array.from(directorySizeTable.values()).reduce(
  (candidate, current) => {
    // candidate must be smaller than sizeRequired, but larger than the current choice
    return current >= sizeRequired && current <= candidate
      ? current
      : candidate;
  },
  Infinity
);
console.log("q2: ", q2);
