const fs = require("fs");
const path = require("path");

const inputFile = path.resolve(__dirname, "./input.txt");

fs.readFile(inputFile, "utf8", (err, data) => {
  if (err) {
    return console.log(err);
  }

  const forms = data.trim().split("\n\n");

  const count = forms.reduce(
    (sum, curr) => (sum += new Set(curr.replace(/\s/g, "").split("")).size),
    0
  );

  console.log(count);
});
