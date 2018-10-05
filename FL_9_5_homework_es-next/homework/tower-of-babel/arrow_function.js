const inputs = process.argv.slice(2);
const result = inputs.map(input => input[0].toUpperCase())
  .reduce((accumulator, current) => accumulator += current, '');

console.log(result);