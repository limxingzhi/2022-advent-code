type Callback = (old: number) => number;

export type MonkeyType = {
  items: Array<number>;
  operation: Callback;
  test: Callback;
  inspectedCount: number;
};

// test
export const testMonkeys: Array<MonkeyType> = [
  {
    // monkey 0
    items: [79, 98],
    operation: (old) => old * 19,
    test: (val) => (val % 23 === 0 ? 2 : 3),
    inspectedCount: 0,
  },
  {
    // monkey 1
    items: [54, 65, 75, 74],
    operation: (old) => old + 6,
    test: (val) => (val % 19 === 0 ? 2 : 0),
    inspectedCount: 0,
  },
  {
    // monkey 2
    items: [79, 60, 97],
    operation: (old) => old * old,
    test: (val) => (val % 13 === 0 ? 1 : 3),
    inspectedCount: 0,
  },
  {
    // monkey 3
    items: [74],
    operation: (old) => old + 3,
    test: (val) => (val % 17 === 0 ? 0 : 1),
    inspectedCount: 0,
  },
];

export const monkeys: Array<MonkeyType> = [
  {
    // monkey 0
    items: [54, 89, 94],
    operation: (old) => old * 7,
    test: (val) => (val % 17 === 0 ? 5 : 3),
    inspectedCount: 0,
  },
  {
    // monkey 1
    items: [66, 71],
    operation: (old) => old + 4,
    test: (val) => (val % 3 === 0 ? 0 : 3),
    inspectedCount: 0,
  },
  {
    // monkey 2
    items: [76, 55, 80, 55, 55, 96, 78],
    operation: (old) => old + 2,
    test: (val) => (val % 5 === 0 ? 7 : 4),
    inspectedCount: 0,
  },
  {
    // monkey 3
    items: [93, 69, 76, 66, 89, 54, 59, 94],
    operation: (old) => old + 7,
    test: (val) => (val % 7 === 0 ? 5 : 2),
    inspectedCount: 0,
  },
  {
    // monkey 4
    items: [80, 54, 58, 75, 99],
    operation: (old) => old * 17,
    test: (val) => (val % 11 === 0 ? 1 : 6),
    inspectedCount: 0,
  },
  {
    // monkey 5
    items: [69, 70, 85, 83],
    operation: (old) => old + 8,
    test: (val) => (val % 19 === 0 ? 2 : 7),
    inspectedCount: 0,
  },
  {
    // monkey 6
    items: [89],
    operation: (old) => old + 6,
    test: (val) => (val % 2 === 0 ? 0 : 1),
    inspectedCount: 0,
  },
  {
    // monkey 7
    items: [62, 80, 58, 57, 93, 56],
    operation: (old) => old * old,
    test: (val) => (val % 13 === 0 ? 6 : 4),
    inspectedCount: 0,
  },
];
