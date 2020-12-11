const fs = require("fs");
const path = require("path");

const inputFile = path.resolve(__dirname, "./input.txt");

fs.readFile(inputFile, "utf8", (err, data) => {
  if (err) {
    return console.log(err);
  }

  const validations = data
    .trim()
    .split("\n")
    .map((row) => {
      const re = /([0-9]+)-([0-9]+) ([a-z]): (.+)/;

      const [_match, lowStr, highStr, letter, str] = re.exec(row);
      const low = parseInt(lowStr, 10);
      const high = parseInt(highStr, 10);
      const count = str.split("").filter((char) => char === letter).length;

      return {
        isValid: low <= count && count <= high,
      };
    });

  const validCount = validations.filter((entry) => entry.isValid).length;
  console.log(validCount);
});
