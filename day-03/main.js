import fs from "fs";

const banks = fs.readFileSync("input.txt", "utf-8").trim().split("\n").map(x => x.trim());

function findBestJoltage(bank) {
  const digits = bank.split("").map(Number);
  let max = -1;
  for (let i = 0; i < digits.length - 1; i++) {
    for (let j = i + 1; j < digits.length; j++) {
      const val = digits[i] * 10 + digits[j];
      if (val > max) max = val;
    }
  }
  return max;
}

const bests = banks.map(bank => findBestJoltage(bank));

console.log(bests.reduce((a, b) => a + b, 0));

function findBestJoltage12(bank) {
  const digits = bank.split("").map(Number);
  const k = 12;
  const stack = [];
  let toRemove = digits.length - k;
  for (const d of digits) {
    while (stack.length && toRemove > 0 && stack[stack.length - 1] < d) {
      stack.pop();
      toRemove--;
    }
    stack.push(d);
  }
  
  return Number(stack.slice(0, k).join(""));
}

const bests12 = banks.map(bank => findBestJoltage12(bank));
console.log(bests12.reduce((a, b) => a + b, 0));