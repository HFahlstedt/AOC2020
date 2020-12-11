const fs = require("fs");
const path = require("path");

const inputFile = path.resolve(__dirname, "./input.txt");

fs.readFile(inputFile, "utf8", (err, data) => {
  if (err) {
    return console.log(err);
  }

  const instructions = data
    .trim()
    .split("\n")
    .map((row) => {
      const d = /(jmp|acc|nop) ([+-][0-9]+)/.exec(row);

      return {
        instruction: d[1],
        parameter: parseInt(d[2], 10),
        visited: false,
      };
    });

  let accumulator = 0;
  let pp = 0;
  while (true) {
    const inst = instructions[pp];

    if (inst.visited) break;

    inst.visited = true;
    if (inst.instruction === "nop") {
      pp++;
    } else if (inst.instruction === "jmp") {
      pp += inst.parameter;
    } else if (inst.instruction === "acc") {
      accumulator += inst.parameter;
      pp++;
    } else {
      throw "fail";
    }
  }

  console.log(accumulator);
});
