import fs from "fs";

const input = fs.readFileSync("input.txt", "utf-8").trim().split('\n');

const rows = input.length;
const cols = input[0].length;

let start = -1;
for (let c = 0; c < cols; c++) {
    if (input[0][c] === 'S') {
        start = c;
        break;
    }
}

let beams = new Set([start]);
let splits = 0;

for (let row = 1; row < rows; row++) {
    const nextBeams = new Set();
    
    for (const col of beams) {
        if (col < 0 || col >= cols) continue;
        
        if (input[row][col] === '^') {
            splits++;
            if (col - 1 >= 0) nextBeams.add(col - 1);
            if (col + 1 < cols) nextBeams.add(col + 1);
        } else {
            nextBeams.add(col);
        }
    }
    
    beams = nextBeams;
}

console.log(splits);

let timelineCount = 1;
let activeColumns = new Map([[start, 1]]);

for (let row = 1; row < rows; row++) {
    const nextColumns = new Map();
    
    for (const [col, count] of activeColumns) {
        if (col < 0 || col >= cols) continue;
        
        if (input[row][col] === '^') {
            const leftCol = col - 1;
            const rightCol = col + 1;
            
            if (leftCol >= 0) {
                nextColumns.set(leftCol, (nextColumns.get(leftCol) || 0) + count);
            }
            if (rightCol < cols) {
                nextColumns.set(rightCol, (nextColumns.get(rightCol) || 0) + count);
            }
            
            timelineCount += count;
        } else {
            nextColumns.set(col, (nextColumns.get(col) || 0) + count);
        }
    }
    
    activeColumns = nextColumns;
}

console.log(timelineCount);

