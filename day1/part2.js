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
      const current = array[i];

      if (lookup[sum - current] === true) {
        return [current, sum - current];
      }
    }

    return null;
  };

  for (let i = 0; i < numbers.length; i++) {
    const first = numbers[i];

    const res = findPair(numbers, 2020 - first, hashSet);

    if (res !== null) {
      const [second, third] = res;
      console.log(
        "Found: ",
        first,
        second,
        third,
        "Product: ",
        first * second * third
      );
      return;
    }
  }
});
