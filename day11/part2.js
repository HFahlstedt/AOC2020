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
    let count = 0;

    for (let x_s = x - 1, y_s = y - 1; x_s >= 0 && y_s >= 0; x_s--, y_s--) {
      const s = plan[y_s][x_s];
      if (s !== ".") {
        count += s === "#" ? 1 : 0;
        break;
      }
    }

    for (let y_s = y - 1; y_s >= 0; y_s--) {
      const s = plan[y_s][x];
      if (s !== ".") {
        count += s === "#" ? 1 : 0;
        break;
      }
    }

    for (let x_s = x + 1, y_s = y - 1; x_s < width && y_s >= 0; x_s++, y_s--) {
      const s = plan[y_s][x_s];
      if (s !== ".") {
        count += s === "#" ? 1 : 0;
        break;
      }
    }

    for (let x_s = x - 1; x_s >= 0; x_s--) {
      const s = plan[y][x_s];
      if (s !== ".") {
        count += s === "#" ? 1 : 0;
        break;
      }
    }

    for (let x_s = x + 1; x_s < width; x_s++) {
      const s = plan[y][x_s];
      if (s !== ".") {
        count += s === "#" ? 1 : 0;
        break;
      }
    }

    for (let x_s = x - 1, y_s = y + 1; x_s >= 0 && y_s < height; x_s--, y_s++) {
      const s = plan[y_s][x_s];
      if (s !== ".") {
        count += s === "#" ? 1 : 0;
        break;
      }
    }

    for (let y_s = y + 1; y_s < height; y_s++) {
      const s = plan[y_s][x];
      if (s !== ".") {
        count += s === "#" ? 1 : 0;
        break;
      }
    }

    for (
      let x_s = x + 1, y_s = y + 1;
      x_s < width && y_s < height;
      x_s++, y_s++
    ) {
      const s = plan[y_s][x_s];
      if (s !== ".") {
        count += s === "#" ? 1 : 0;
        break;
      }
    }

    if (current === "L" && count === 0) return "#";
    if (current === "#" && count >= 5) return "L";

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
