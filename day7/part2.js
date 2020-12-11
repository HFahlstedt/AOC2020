const fs = require("fs");
const path = require("path");

const inputFile = path.resolve(__dirname, "./input.txt");

fs.readFile(inputFile, "utf8", (err, data) => {
  if (err) {
    return console.log(err);
  }

  const textRules = data.trim().split("\n");

  const rules = textRules.map((r) => {
    const re = /([a-z]+ [a-z]+) bags contain (.+)\./;
    const result = re.exec(r);
    return {
      key: result[1],
      value: result[2]
        .split(", ")
        .map((x) => x.replace(/([0-9]) ([a-z]+ [a-z]+) bags?/, "$1 $2")),
    };
  });

  const bagCount = (color) => {
    const contains = rules.find((r) => r.key === color).value;

    const all = contains.map((c) => {
      if (c === "no other bags") return 0;

      const [countStr, ...color] = c.split(" ");
      const count = parseInt(countStr, 10);

      return count + count * bagCount(color.join(" "));
    });

    return all.reduce((sum, curr) => sum + curr, 0);
  };

  const x = bagCount("shiny gold");
  console.log(x);
});
