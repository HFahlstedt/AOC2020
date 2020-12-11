const fs = require("fs");
const path = require("path");

const inputFile = path.resolve(__dirname, "./input.txt");

fs.readFile(inputFile, "utf8", (err, data) => {
  if (err) {
    return console.log(err);
  }

  const textRules = data.trim().split("\n");

  const rules = textRules.map((r) => {
    const re = /([a-z]+ [a-z]+) bags contain (.+)./;
    const result = re.exec(r);
    return {
      color: result[1],
      contains: result[2]
        .split(", ")
        .map((x) => x.replace(/[0-9] ([a-z]+ [a-z]+) bags?/, "$1")),
    };
  });

  const containsColor = (color) =>
    rules.filter((r) => r.contains.includes(color)).map((r) => r.color);

  const containsGold = containsColor("shiny gold");
  let contains = new Set(containsGold);

  let found = [...containsGold];

  while (found.length > 0) {
    const tmp = [];

    for (let i = 0; i < found.length; i++) {
      const color = found[i];
      const next = containsColor(color);
      tmp.push(...next);
      for (let j = 0; j < next.length; j++) {
        const element = next[j];
        contains.add(element);
      }
    }

    found = tmp;
  }

  console.log(contains.size);
});
