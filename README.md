# README

Thanks to [Theo Browne's video](https://youtu.be/xIj13W0T7Ws) for helping me discover this challenge.

Ref: https://adventofcode.com/2022

- [x] [Day 1](#day-1-calorie-counting) - NodeJS
- [x] [Day 2](#day-2-rock-paper-scissors) - NodeJS
- [x] [Day 3](#day-3-rucksack-reorganization) - NodeJS
- [x] [Day 4](#day-4-camp-cleanup) - NodeJS
- [x] [Day 5](#day-5-supply-stacks) - Deno
- [x] [Day 6](#day-6-tuning-trouble) - Deno
- [x] [Day 7](#day-7-no-space-left-on-device) - Deno
- [ ] [Day 8](#) -
- [ ] [Day 9](#) -
- [ ] [Day 10](#) -
- [ ] [Day 11](#) -
- [ ] [Day 12](#) -
- [ ] [Day 13](#) -
- [ ] [Day 14](#) -
- [ ] [Day 15](#) -
- [ ] [Day 16](#) -
- [ ] [Day 17](#) -
- [ ] [Day 18](#) -
- [ ] [Day 19](#) -
- [ ] [Day 20](#) -
- [ ] [Day 21](#) -
- [ ] [Day 22](#) -
- [ ] [Day 23](#) -
- [ ] [Day 24](#) -
- [ ] [Day 25](#) -

---

## Day 1: Calorie Counting

ref: https://adventofcode.com/2022/day/1

Q1: The input is a list of numbers with some empty lines. Sum up the values in all individual continuous lists and find the largest one sum.

Q2: Find the sum of all 3 largest continuous lists.

My Solution:

- NodeJS
- Array Reduce and Tuples

---

## Day 2: Rock Paper Scissors

ref: https://adventofcode.com/2022/day/2

Q1: Match the pattern against a score and add them up

Q2: Just modify the hashmap a little bit

My Solution:

- NodeJS
- Array Reduce and Hash Map

---

## Day 3: Rucksack Reorganization

ref: https://adventofcode.com/2022/day/3

Q1: Find the repeating char in each string, check it against its score and add all of the scores up.

Q2: Find the repeating char in each 3 strings, check it against its score and add all of the scores up.

My Solution:

- NodeJS
- Array Reduce, HashMap, Sets, Tuples

---

## Day 4: Camp Cleanup

ref: https://adventofcode.com/2022/day/4

Q1: Count how many pairs of ranges have one range fully containing the other

Q2: Count how many pairs of ranges overlap

My Solution:

- NodeJS
- Array destructuring

I spent way too much time before realizing I forgot to parse the strings into numbers. Should had used TypeScript...

---

## Day 5: Supply Stacks

ref: https://adventofcode.com/2022/day/5

Q1: Rotated the stack for crates so they are a 2D array of stacks

Q2: Introduced a temp array to collect the crates before moving. I could use `Array.prototype.slice` to achieve the same goal, but I had to work today and I am tired

My Solution:

- Due to yesterday's `parseInt`, I used TypeScript today and tried Deno for the first time. I liked it
- I cheated a little bit by manually splitting the data into crates and movements. Also cheated a bit by manually cleaning the crates

---

## Day 6: Tuning Trouble

ref: https://adventofcode.com/2022/day/6

Q1: Iterating an array and finding non repeating values

Q2: Basically the same thing, just instead of 4, use 14

My Solution:

- I used `Set` to do the matching, because its to much work to write a manual one haha
- Q2 and Q1 are basically the same question

---

## Day 7: No Space Left On Device

ref: https://adventofcode.com/2022/day/7

My Solution:

The problem looks like it requires tree tranversal on first glance, but not really. The movement through the directory is done procedurally, which means we can create a dynamic array of the path locations and pop/push to it according to the working directory. I create a hash table where the key = path, value = size. The reason for this will come later. After that, I wrote a simple toString function which converts the current directory to a string. And then I iterate through the dynamic array and add the size to each of the paths.

Afterwards, both questions can be solved by iterating the hashmap's values.
