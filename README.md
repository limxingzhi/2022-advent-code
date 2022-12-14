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
- [x] [Day 8](#day-8-treetop-tree-house) - Deno
- [x] [Day 9](#day-9-rope-bridge) - Deno
- [x] [Day 10](#day-10-cathode-ray-tube) - Deno
- [x] [Day 11](#day-11-monkey-in-the-middle) - Deno
- [x] [Day 12](#day-12-hill-climbing-algorithm) - Deno
- [x] [Day 13](#day-13-distress-signal) - Deno
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

---

## Day 8: Treetop Tree House

ref: https://adventofcode.com/2022/day/8

My Solution:

Break down the problem. Identify what you need to get and then abstract that problem away. Eventually, each problem will be abstract enough that simple iteration will suffice.

At first, I tried to tackle everything within two reduces. That is when I kept running into problems. I tried to iterate while keeping score, and the code became a mess. The solution? Abstract the score keeping from the iteration, write simple code for both of them and the problem will simplify itself.

---

## Day 9: Rope Bridge

ref: https://adventofcode.com/2022/day/9

My Solution:

This is an interesting one. I understood the behavior wrong for Q1 but still managed to solve the question. The Q1 committed here is updated to have the correct behavior. I corrected the behavior before moving to Q2 so the solution can scale.

Basically, just do what the question says, I did not do anything fancy in this puzzle. For Q2, I used an array instead of 2 positions. Yea, that's about it

---

## Day 10: Cathode-Ray Tube

ref: https://adventofcode.com/2022/day/10

My Solution:

Q1:

Rather than running one loop for each cycle, I run a loop against the commands, and then looping the cycle count of each command. What this means is; instead of making my code follow the CPU cycle, I made my code follow the commands and iterate the cycle within each command.

Q2:

The same logic as Q1 for iteration. I used a single line to draw the screen and then split that line into 6 rows afterwards.

---

## Day 11: Monkey in the Middle

ref: https://adventofcode.com/2022/day/11

My Solution:

Q1 was pretty simple, you just do what they tell you to do and it works.

Q2, well, _MATH_. You need to realized this

```
893234 mod 4 = 2
893234 mod (4*5) mod 4 = 2
```

And so, if we take all of the test operands that involves mod and multiple them, we can just save the remainder since it gives the same value for the tests.

---

## Day 12: Hill Climbing Algorithm

ref: https://adventofcode.com/2022/day/12

My Solution:

Q1: BFS

Q2. I am 2 days behind, so I just brute forced all paths starting from all A points. Of course I can optimize it, but again. I am 2 days behind :)

Is brute forcing an optimized solution? Of course not. Making it asynchronous barely saved half a second. Is it a good solution? Well, that depends on the business requirements now, doesn't it :)

---

## Day 13: Distress Signal

ref: https://adventofcode.com/2022/day/13

My Solution:

Nothing interesting, just good old TypeScript loops and recursions
