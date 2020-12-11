const fs = require("fs");
const path = require("path");

const inputFile = path.resolve(__dirname, "./input.txt");

fs.readFile(inputFile, "utf8", (err, data) => {
  if (err) {
    return console.log(err);
  }

  const passports = data
    .trim()
    .split("\n\n")
    .map((row) =>
      row.split(/\s/).reduce((acc, cur) => {
        const [f, v] = cur.split(":");
        acc[f] = v;
        return acc;
      }, {})
    );

  const isValid = ({ byr, iyr, eyr, hgt, hcl, ecl, pid }) => {
    const valid_byr = /^19[2-9][0-9]$|^20([0-1][0-9]|20)$/.test(byr);
    const valid_iyr = /^20(1[0-9]|20)$/.test(iyr);
    const valid_eyr = /^20(2[0-9]|30)$/.test(eyr);
    const valid_hgt = /(^1(5[0-9]|[6-8][0-9]|9[0-3])cm$|^(59|6[0-9]|7[0-6])in$)/.test(
      hgt
    );
    const valid_hcl = /^#[0-9a-f]{6}$/.test(hcl);
    const valid_ecl = /^(amb|blu|brn|gry|grn|hzl|oth)$/.test(ecl);
    const valid_pid = /^[0-9]{9}$/.test(pid);

    return (
      valid_byr &&
      valid_iyr &&
      valid_eyr &&
      valid_hgt &&
      valid_hcl &&
      valid_ecl &&
      valid_pid
    );
  };

  const count = passports.reduce((sum, obj) => {
    return sum + (isValid(obj) ? 1 : 0);
  }, 0);

  console.log(count);
});
