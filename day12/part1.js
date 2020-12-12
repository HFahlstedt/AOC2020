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

  const move = (c, d) => {
    switch (c.command) {
      case "N":
        return [0, -c.parameter, 0];
      case "S":
        return [0, c.parameter, 0];
      case "E":
        return [c.parameter, 0, 0];
      case "W":
        return [-c.parameter, 0, 0];
      case "L":
        return [0, 0, -c.parameter];
      case "R":
        return [0, 0, c.parameter];
      case "F":
        return [
          Math.cos((d * 2 * Math.PI) / 360) * c.parameter,
          Math.sin((d * 2 * Math.PI) / 360) * c.parameter,
          0,
        ];
    }
  };

  let x = 0;
  let y = 0;
  let dir = 0;

  for (let i = 0; i < commands.length; i++) {
    const c = commands[i];
    [x_d, y_d, d_d] = move(c, dir);
    x += x_d;
    y += y_d;
    dir = (dir + d_d) % 360;
    console.log(x, y, dir);
  }

  console.log(x, y, Math.abs(x) + Math.abs(y));
});
