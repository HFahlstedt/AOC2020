const fs = require("fs");
const path = require("path");

const inputFile = path.resolve(__dirname, "./input.txt");

fs.readFile(inputFile, "utf8", (err, data) => {
  if (err) {
    return console.log(err);
  }

  const rawArr = data
    .trim()
    .split("\n\n")
    .map((blob) =>
      blob.split(/\s/).reduce((acc, cur) => {
        const [f, v] = cur.split(":");
        acc[f] = v;
        return acc;
      }, {})
    );

  const count = rawArr.reduce((sum, obj) => {
    const keys = Object.keys(obj);
    return (
      sum +
      (keys.length === 8 || (keys.length === 7 && !keys.includes("cid"))
        ? 1
        : 0)
    );
  }, 0);

  console.log(count);
});
