const fs = require("fs");
const path = require("path");

const inputFile = path.resolve(__dirname, "./input.txt");

fs.readFile(inputFile, "utf8", (err, data) => {
  if (err) {
    return console.log(err);
  }

  const seats = data
    .trim()
    .split("\n")
    .map((s) =>
      parseInt(
        s
          .replace(/F/g, "0")
          .replace(/B/g, "1")
          .replace(/R/g, "1")
          .replace(/L/g, "0"),
        2
      )
    );

  console.log(Math.max(...seats));
});
