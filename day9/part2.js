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
    .map((row) => parseInt(row, 10));

  const goal = 1721308972;
  let start = 0;
  let end = 0;
  let runningSum = rawArr[0];

  while (runningSum !== goal) {
    end++;
    runningSum += rawArr[end];

    while (runningSum > goal) {
      runningSum -= rawArr[start];
      start++;
    }
  }

  const seq = rawArr.slice(start, end + 1);
  const min = Math.min(...seq);
  const max = Math.max(...seq);
  console.log(min + max);
});
