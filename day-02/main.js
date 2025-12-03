import fs from "fs";

let max = 0n;

let ranges = fs.
readFileSync("input.txt", "utf-8")
.trim()
.split(",")
.map(range => {
  const [start, end] = range.split("-");
  const maxCandidate = BigInt(end);
  if (maxCandidate > max) max = maxCandidate;
  return [BigInt(start), maxCandidate];
});

const L = Math.ceil(max.toString().length/2) * 2;

let seqLens = Array.from(
  {length: L/2},
  (_, i) => i + 1
);

let invIDs = seqLens.flatMap(S => {
  const minS = BigInt(10) ** BigInt(S - 1);
  const maxS = (BigInt(10) ** BigInt(S)) - 1n;

  const seqs = [];

  for(let s = minS; s <= maxS; s++) seqs.push(s);

  return seqs.map(s => BigInt(`${s}${s}`));
});

let sum = invIDs.reduce((acc, val) => {
  const inRange = ranges.some(([start,end]) => {
    return val >= start && val <= end;
  });

  return inRange ? acc + val : acc;
}, 0n);

console.log(`${sum}`);

max = 0n;

ranges = fs.
readFileSync("input.txt", "utf-8")
.trim()
.split(",")
.map(range => {
  const [start, end] = range.split("-");
  const maxCandidate = BigInt(end);
  if (maxCandidate > max) max = maxCandidate;
  return [BigInt(start), maxCandidate];
});

const maxIdLength = max.toString().length;
const maxSeqLen = Math.floor(maxIdLength / 2);

seqLens = Array.from(
  {length: maxSeqLen},
  (_, i) => i + 1
);

invIDs = seqLens.flatMap(S_len => {
  const minS = BigInt(10) ** BigInt(S_len - 1);
  const maxS = (BigInt(10) ** BigInt(S_len)) - 1n;


  const seqs = [];
  for(let s = minS; s <= maxS; s++) seqs.push(s);

  return seqs.flatMap(s => {
      const str = s.toString();
      const generatedIDs = [];
      let n = str; 

      for (let R = 2; ; R++) {
          n += str;

          if (n.length > maxIdLength) break;

          const val = BigInt(n);
          
          if (val > max) break;
          
          generatedIDs.push(val);
      }
      return generatedIDs;
  });
});

const uniqueInvIDs = Array.from(new Set(invIDs));

sum = uniqueInvIDs.reduce((acc, val) => {
  const inRange = ranges.some(([start,end]) => {
    return val >= start && val <= end;
  });

  return inRange ? acc + val : acc;
}, 0n);

console.log(`${sum}`);
