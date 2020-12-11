const fs = require("fs");
const path = require("path");

const inputFile = path.resolve(__dirname, "./input.txt");

fs.readFile(inputFile, "utf8", (err, data) => {
  if (err) {
    return console.log(err);
  }

  const rawArr = data
    .trim()
    .split("\n")
    .map((x) => parseInt(x, 10))
    .sort((a, b) => a - b);

  const diffs = [];
  let curr = 0;

  for (let i = 0; i < rawArr.length; i++) {
    const element = rawArr[i];
    diffs.push(element - curr);
    curr = element;
  }

  diffs.push(3);

  const getMultiplier = (len) => [1, 1, 2, 4, 7][len];

  const variants = diffs
    .join("")
    .split("3")
    .reduce((prod, curr) => prod * getMultiplier(curr.length), 1);

  console.log(variants);
});
