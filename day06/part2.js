const fs = require("fs");
const path = require("path");

const inputFile = path.resolve(__dirname, "./input.txt");

fs.readFile(inputFile, "utf8", (err, data) => {
  if (err) {
    return console.log(err);
  }

  const forms = data.trim().split("\n\n");
  let count = 0;

  for (let i = 0; i < forms.length; i++) {
    const answered = {};
    const people = forms[i].split("\n");
    const questions = people.join("");

    for (let j = 0; j < questions.length; j++) {
      const a = questions[j];
      answered[a] = answered[a] ? answered[a] + 1 : 1;
      if (answered[a] === people.length) count++;
    }
  }

  console.log(count);
});
