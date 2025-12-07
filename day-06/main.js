import fs from "fs";

const input = fs.readFileSync("input.txt", "utf-8").split('\n');

const data = input.map(x => x.split(" "))
const operations = data.pop();

const numbers = data.map(x => x.filter(x => x !== "").map(Number));
const filteredOperations = operations.filter( x => x !== "");


function applyOperation(op, vals) {
  switch(op) {
    case "+":
      return vals.reduce((a, b) => a + b, 0);
    case "*":
      return vals.reduce((a, b) => a * b, 1);
    default:
      throw new Error(`Unknown operation: ${op}`);
  }
}

let results = [];

for(let i = 0; i < filteredOperations.length; i++) {
  let op = filteredOperations[i];
  const vals = [];
  for(let j = 0; j < numbers.length; j++) {
    vals.push(numbers[j][i]);
  }

  const result = applyOperation(op, vals);
  results.push(result);
}

const totalResult = results.reduce((a, b) => a + b, 0);

console.log(totalResult);


const lines = input;
results = []; 
let currentNumbers = [];
let operation = '';

OUTER: for(let i = lines[0].length - 1; i >= 0; i--) {
  let number = '';

  INNER: for(let j = 0; j < lines.length; j++) {
    if(lines[j][i] == undefined) continue;

    if(lines[j][i] == '*' || lines[j][i] == '+') {
      operation = lines[j][i]
      currentNumbers.push(number);;
      results.push({operation, currentNumbers});
      currentNumbers = [];
      continue OUTER;
    }

    number += lines[j][i];
  }
  currentNumbers.push(number);
}

results.map(entry => {
  const numbers = entry.currentNumbers.map(x => x.trim()).map(Number).filter(x => x !== 0);
  const operation = entry.operation;
  entry.result = applyOperation(operation, numbers);
})

const total = results.reduce((acc, entry) => acc + entry.result, 0);


console.log(total);