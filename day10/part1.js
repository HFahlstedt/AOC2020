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

  const count = [];
  count[1] = 0;
  count[3] = 0;
  let curr = 0;

  for (let i = 0; i < rawArr.length; i++) {
    count[rawArr[i] - curr]++;
    curr = rawArr[i];
  }
  count[3]++;

  console.log(count[1], count[3], count[1] * count[3]);
});
