const fs = require("fs");
const path = require("path");

const inputFile = path.resolve(__dirname, "./input.txt");

fs.readFile(inputFile, "utf8", (err, data) => {
  if (err) {
    return console.log(err);
  }

  const numbers = data
    .trim()
    .split("\n")
    .map((d) => parseInt(d, 10));

  const hashSet = [];

  numbers.forEach((element) => {
    hashSet[element] = true;
  });

  const findPair = (array, sum, lookup) => {
    for (let i = 0; i < array.length; i++) {
      const x = array[i];

      if (lookup[sum - x] === true) return [x, sum - x];
    }

    return null;
  };

  const [a, b] = findPair(numbers, 2020, hashSet);

  console.log("Found: ", a, b, a * b);
});
