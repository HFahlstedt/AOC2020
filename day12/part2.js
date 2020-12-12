const fs = require("fs");
const path = require("path");

const inputFile = path.resolve(__dirname, "./input.txt");

fs.readFile(inputFile, "utf8", (err, data) => {
  if (err) {
    return console.log(err);
  }

  const commands = data
    .trim()
    .split("\n")
    .map((row) => {
      return {
        command: row[0],
        parameter: parseInt(row.substr(1), 10),
      };
    });

  const move = (c, x, y) => {
    let tmp_x = x;
    let tmp_y = y;

    switch (c.command) {
      case "N":
        return [x, y - c.parameter];
      case "S":
        return [x, y + c.parameter];
      case "E":
        return [x + c.parameter, y];
      case "W":
        return [x - c.parameter, y];
      case "L":
        for (let d = c.parameter; d > 0; d -= 90) {
          const old_x = tmp_x;
          tmp_x = tmp_y;
          tmp_y = -old_x;
        }
        return [tmp_x, tmp_y];
      case "R":
        for (let d = 0; d < c.parameter; d += 90) {
          const old_x = tmp_x;
          tmp_x = -tmp_y;
          tmp_y = old_x;
        }
        return [tmp_x, tmp_y];
    }
  };

  let x = 0;
  let y = 0;
  let w_x = 10;
  let w_y = -1;

  for (let i = 0; i < commands.length; i++) {
    const c = commands[i];
    if (c.command === "F") {
      x += c.parameter * w_x;
      y += c.parameter * w_y;
    } else {
      const [x_d, y_d] = move(c, w_x, w_y);
      w_x = x_d;
      w_y = y_d;
    }

    console.log(x, y, w_x, w_y);
  }

  console.log(x, y, Math.abs(x) + Math.abs(y));
});
