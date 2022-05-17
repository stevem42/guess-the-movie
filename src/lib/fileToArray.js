let fs = require('fs');
const util = require('util');

const readFileLines = (filename) =>
  fs.readFileSync(filename).toString('UTF8').split('\n');

let arr = readFileLines('movieList.txt');

// fs.writeFile('./newArray.js', arr, function (err) {
//   if (err) {
//     console.log(err.message);
//     return;
//   }
//   console.log('Written');
// });

console.log(util.inspect(arr, { maxArrayLength: null }));
