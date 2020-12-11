const fs = require("fs");
const path = require("path");

const inputFile = path.resolve(__dirname, "./input.txt");

fs.readFile(inputFile, "utf8", (err, data) => {
  if (err) {
    return console.log(err);
  }

  const orig_instructions = data
    .trim()
    .split("\n")
    .map((row) => {
      const d = /(jmp|acc|nop) ([+-][0-9]+)/.exec(row);

      return {
        instruction: d[1],
        parameter: parseInt(d[2], 10),
      };
    });

  let accumulator = 0;
  let pp = 0;
  let flipped = -1;
  const tried = [];
  let visited = [];
  let instructions = [...orig_instructions];

  while (pp < orig_instructions.length) {
    if (visited.includes(pp)) {
      flipped = -1;
      instructions = [...orig_instructions];
      pp = 0;
      visited = [];
      accumulator = 0;
    }

    const inst = instructions[pp];
    visited.push(pp);

    if (inst.instruction === "nop") {
      if (flipped > 0 || tried.includes(pp)) {
        pp++;
      } else {
        flipped = pp;
        tried.push(pp);
        pp += inst.parameter;
      }
    } else if (inst.instruction === "jmp") {
      if (flipped > 0 || tried.includes(pp)) {
        pp += inst.parameter;
      } else {
        flipped = pp;
        tried.push(pp);
        pp++;
      }
    } else if (inst.instruction === "acc") {
      accumulator += inst.parameter;
      pp++;
    } else {
      throw "fail";
    }
  }

  console.log(accumulator);
});
