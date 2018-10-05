const rawArgs = process.argv.slice(2);
const args = [];

rawArgs.forEach(val => {
  let commaSep = val.split(',');
  commaSep.forEach(val => {
    if(val !== '') args.push(+val);
  });
});

const avg = (...args) => args.reduce((a, b) => a + b) / args.length;

console.log(avg(...args));