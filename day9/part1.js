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

  let last25 = new Set(rawArr.slice(0, 26));

  for (let i = 25; i < rawArr.length; i++) {
    const a = rawArr[i];

    let contains = false;
    const iter = last25.values();
    let b = iter.next();

    while (!b.done) {
      if (last25.has(a - b.value)) {
        contains = true;
        break;
      }
      b = iter.next();
    }

    if (!contains) {
      console.log(a);
      break;
    }

    last25.delete(rawArr[25 - i]);
    last25.add(a);
  }

  //  console.table(rawArr);
});
