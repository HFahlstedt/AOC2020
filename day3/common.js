exports.countTrees = (stepY, stepX, height, width, map) => {
  let x = 0;
  let y = 0;
  let count = 0;

  while (y < height - stepY) {
    y += stepY;
    x = (x + stepX) % width;

    if (map[y].includes(x)) count++;
  }

  return count;
};
