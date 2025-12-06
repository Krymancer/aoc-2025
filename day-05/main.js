import fs from "fs";

const input = fs.readFileSync("input.txt", "utf-8").trim().split('\n').map(x => x.trim());
const data = input;

const indexOfBlank = data.indexOf('');

const ranges = data.slice(0, indexOfBlank);
const ids = data.slice(indexOfBlank + 1).map(x => Number(x));

const parsedRanges = ranges.map(x => x.split('-').map(Number));
const sortedRanges = parsedRanges.sort((a, b) => a[0] - b[0]);

function isInRange(id, range){
  const [start, end] = range;
  return id >= start && id <= end;
}

const fresh = [];

for(const id of ids) {
  if(sortedRanges.some(range => isInRange(id, range))) {
    fresh.push(id);
    continue;
  }
}

console.log(fresh.length);

function canMergeRanges(range1, range2) {
  const [start1, end1] = range1;
  const [start2, end2] = range2;

  return !(end1 < start2 - 1 || end2 < start1 - 1);
}

function mergeTwoRanges(range1, range2) {
  const [start1, end1] = range1;
  const [start2, end2] = range2;

  const mergedStart = Math.min(start1, start2);
  const mergedEnd = Math.max(end1, end2);

  return [mergedStart, mergedEnd];
}

const mergedRanges = [];

for(const range of sortedRanges) {
  if(mergedRanges.length === 0) {
    mergedRanges.push(range);
    continue;
  }

  const lastMergedRange = mergedRanges[mergedRanges.length - 1];

  if(canMergeRanges(lastMergedRange, range)) {
    const newMergedRange = mergeTwoRanges(lastMergedRange, range);
    mergedRanges[mergedRanges.length - 1] = newMergedRange;
  } else {
    mergedRanges.push(range);
  }
}

let totalCovered = 0;

for(const range of mergedRanges) {
  const [start, end] = range;
  totalCovered += (end - start + 1);
}

console.log(totalCovered);
