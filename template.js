const fs = require("fs");
const path = require("path");

const inputFile = path.resolve(__dirname, "./input.txt");

fs.readFile(inputFile, "utf8", (err, data) => {
  if (err) {
    return console.log(err);
  }

  const rawArr = data.trim().split("\n");
});
