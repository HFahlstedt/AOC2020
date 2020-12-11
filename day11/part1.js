const fs = require("fs");
const path = require("path");

const inputFile = path.resolve(__dirname, "./input.txt");

fs.readFile(inputFile, "utf8", (err, data) => {
  if (err) {
    return console.log(err);
  }

  let floorPlan = data
    .trim()
    .split("\n")
    .map((row) => row.split(""));

  const height = floorPlan.length;
  const width = floorPlan[0].length;

  const next = (current, plan, x, y) => {
    const count =
      (y > 0 && x > 0 ? (plan[y - 1][x - 1] === "#" ? 1 : 0) : 0) +
      (y > 0 ? (plan[y - 1][x] === "#" ? 1 : 0) : 0) +
      (y > 0 && x < width - 1 ? (plan[y - 1][x + 1] === "#" ? 1 : 0) : 0) +
      (x > 0 ? (plan[y][x - 1] === "#" ? 1 : 0) : 0) +
      (x < width - 1 ? (plan[y][x + 1] === "#" ? 1 : 0) : 0) +
      (y < height - 1 && x > 0 ? (plan[y + 1][x - 1] === "#" ? 1 : 0) : 0) +
      (y < height - 1 ? (plan[y + 1][x] === "#" ? 1 : 0) : 0) +
      (y < height - 1 && x < width - 1
        ? plan[y + 1][x + 1] === "#"
          ? 1
          : 0
        : 0);

    if (current === "L" && count === 0) return "#";
    if (current === "#" && count >= 4) return "L";

    return current;
  };

  let found = false;

  while (!found) {
    const newPlan = floorPlan.map((x) => x.slice());

    for (let y = 0; y < height; y++) {
      const row = floorPlan[y];

      for (let x = 0; x < width; x++) {
        const pos = row[x];
        const n = next(pos, floorPlan, x, y);
        newPlan[y][x] = n;
      }
    }

    found =
      floorPlan.map((row) => row.join("")).join("") ===
      newPlan.map((row) => row.join("")).join("");

    floorPlan = newPlan.map((x) => x.slice());
  }

  const count = floorPlan
    .map((row) => row.join(""))
    .join("")
    .split("")
    .filter((s) => s === "#").length;

  console.log(count);
});
