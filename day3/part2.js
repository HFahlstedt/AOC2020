const fs = require("fs");
const path = require("path");
const common = require("./common");

const inputFile = path.resolve(__dirname, "./input.txt");

fs.readFile(inputFile, "utf8", (err, data) => {
  if (err) {
    return console.log(err);
  }

  const rawArr = data.trim().split("\n");
  const height = rawArr.length;
  const width = rawArr[0].length;

  const map = rawArr.map((row) => {
    const trees = [];
    row.split("").forEach((element, i) => {
      if (element === "#") {
        trees.push(i);
      }
    });

    return trees;
  });

  console.log(
    common.countTrees(1, 1, height, width, map) *
      common.countTrees(1, 3, height, width, map) *
      common.countTrees(1, 5, height, width, map) *
      common.countTrees(1, 7, height, width, map) *
      common.countTrees(2, 1, height, width, map)
  );
});
