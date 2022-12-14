enum StatusEnum {
  CONTINUE,
  PASS,
  FAIL,
}

type ValueType = number | Array<ValueType>;

const pairedList: Array<[Array<ValueType>, Array<ValueType>]> = [];

let prev: Array<ValueType> | undefined = undefined;
// (await Deno.readTextFile("./test.txt")).split("\n").map((current) => {
(await Deno.readTextFile("./input.txt")).split("\n").map((current) => {
  if (!current) return;
  if (prev === undefined) {
    prev = JSON.parse(current);
  } else {
    pairedList.push([prev, JSON.parse(current)]);
    prev = undefined;
  }
});

function compare(item1: ValueType, item2: ValueType): StatusEnum {
  if (typeof item1 === "number" && typeof item2 === "number") {
    if (item1 === item2) return StatusEnum.CONTINUE;
    if (item1 < item2) return StatusEnum.PASS;
    return StatusEnum.FAIL;
  }

  if (Array.isArray(item1) && Array.isArray(item2)) {
    for (let i = 0; i < item1.length; i++) {
      if (item2[i] !== undefined) {
        if (compare(item1[i], item2[i]) === StatusEnum.FAIL)
          return StatusEnum.FAIL;
        if (compare(item1[i], item2[i]) === StatusEnum.PASS)
          return StatusEnum.PASS;
      } else return StatusEnum.FAIL; // item 2 ran out before item 1
    }

    // item1 ran out and both matching so far

    // if items same length, continue
    // if items 1 not same length as item 2 (i.e. item1 shorter), pass
    return item1.length === item2.length
      ? StatusEnum.CONTINUE
      : StatusEnum.PASS;
  }

  if (Array.isArray(item1) && typeof item2 === "number")
    return compare(item1, [item2]);

  if (typeof item1 === "number" && Array.isArray(item2))
    return compare([item1], item2);

  // item1 ran out before 2
  if (typeof item1 === "undefined" && typeof item2 !== "undefined")
    return StatusEnum.PASS;

  // item2 ran out before item1
  if (typeof item1 !== "undefined" && typeof item2 === "undefined")
    return StatusEnum.FAIL;

  throw new Error("idk");
}

const q1 = pairedList.reduce((count, [item1, item2], index) => {
  const comparison = compare(item1, item2);
  const validPair =
    comparison === StatusEnum.CONTINUE || comparison === StatusEnum.PASS;
  if (validPair) return count + index + 1;
  else return count;
}, 0);
console.log("q1", q1);

const dividerPackets = [[[2]], [[6]]];
const dividerPacketsSet = new Set(
  dividerPackets.map((val) => JSON.stringify(val))
);

const q2 = [...pairedList, dividerPackets] // add dividers in
  .reduce((prev, current) => {
    // split the pairlist back into single lines
    return [...prev, ...current];
  }, [] as Array<ValueType>)
  .sort((item1, item2) => {
    const comparison = compare(item1, item2);
    const smallerA =
      comparison === StatusEnum.CONTINUE || comparison === StatusEnum.PASS;

    return smallerA ? -1 : 1;
  })
  .reduce((count: number, current, index) => {
    // seek out the location of the dividers and multiply all of them
    return dividerPacketsSet.has(JSON.stringify(current))
      ? count * (index + 1)
      : count;
  }, 1 as number);

console.log("q2", q2);
