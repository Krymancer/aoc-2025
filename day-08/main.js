import fs from "fs";

const input = fs.readFileSync("input.txt", "utf-8").trim().split('\n');

const junctionBoxes = input.map(line => {
  const [x,y,z] = line.split(',').map(Number);
  return {x, y, z};
});

function linearDistance(a,b) {
  return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2) + Math.pow(a.z - b.z, 2));
}

const parent = Array.from({length: junctionBoxes.length}, (_, i) => i);
const rank = Array(junctionBoxes.length).fill(0);

function find(x) {
  if (parent[x] !== x) {
    parent[x] = find(parent[x]);
  }
  return parent[x];
}

function union(x, y) {
  const rootX = find(x);
  const rootY = find(y);
  
  if (rootX === rootY) return false;
  
  if (rank[rootX] < rank[rootY]) {
    parent[rootX] = rootY;
  } else if (rank[rootX] > rank[rootY]) {
    parent[rootY] = rootX;
  } else {
    parent[rootY] = rootX;
    rank[rootX]++;
  }
  
  return true;
}

const allPairs = [];
for (let i = 0; i < junctionBoxes.length; i++) {
  for (let j = i + 1; j < junctionBoxes.length; j++) {
    allPairs.push({
      i,
      j,
      dist: linearDistance(junctionBoxes[i], junctionBoxes[j])
    });
  }
}

allPairs.sort((a, b) => a.dist - b.dist);

for (let p = 0; p < 1000; p++) {
  union(allPairs[p].i, allPairs[p].j);
}

const circuits = new Map();
for (let i = 0; i < junctionBoxes.length; i++) {
  const root = find(i);
  if (!circuits.has(root)) circuits.set(root, []);
  circuits.get(root).push(i);
}

const sizes = Array.from(circuits.values()).map(c => c.length).sort((a,b) => b - a);
let result = sizes.slice(0, 3).reduce((a,b) => a * b, 1);
console.log(result);

function countCircuits() {
  const roots = new Set();
  for (let i = 0; i < junctionBoxes.length; i++) {
    roots.add(find(i));
  }
  return roots.size;
}

let lastPair = null;
for (let p = 1000; p < allPairs.length; p++) {
  const pair = allPairs[p];
  if (union(pair.i, pair.j)) {
    lastPair = pair;
    if (countCircuits() === 1) break;
  }
}

result = junctionBoxes[lastPair.i].x * junctionBoxes[lastPair.j].x;
console.log(result);