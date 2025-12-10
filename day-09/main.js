import fs from "fs";

const input = fs.readFileSync("input.txt", "utf-8").trim().split('\n');

const crosses = input.map(line => {
  const [x,y] = line.split(',').map(Number);
  return {x, y};
});

function area(a,b) {
  return (Math.abs(a.x - b.x) + 1) * (Math.abs(a.y - b.y) + 1);
}

let largestArea = 0;

for(let i = 0; i < crosses.length; i++) {
  for(let j = i + 1; j < crosses.length; j++) {
    const a = crosses[i];
    const b = crosses[j];
    const currentArea = area(a, b);

    if(currentArea > largestArea) {
      largestArea = currentArea;
    }
  }
}

console.log(largestArea);