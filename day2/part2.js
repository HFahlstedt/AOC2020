const fs = require("fs");
const path = require("path");

const inputFile = path.resolve(__dirname, "./input.txt");

fs.readFile(inputFile, "utf8", (err, data) => {
  if (err) {
    return console.log(err);
  }

  const arr = data
    .trim()
    .split("\n")
    .map((row) => {
      const re = /([0-9]+)-([0-9]+) ([a-z]): (.+)/;
      const [_match, firstStr, secondStr, letter, str] = re.exec(row);
      const first = parseInt(firstStr, 10) - 1;
      const second = parseInt(secondStr, 10) - 1;
      const firstEquals = str[first] === letter;
      const secondEquals = str[second] === letter;

      return {
        isValid: firstEquals ? !secondEquals : secondEquals,
      };
    });

  const validCount = arr.filter((entry) => entry.isValid).length;
  console.log(validCount);
});
