const fs = require('fs');

function run(generator) {
  let it = generator(go);

  function go(error, result) {
    if (error) {
      return it.throw(error);
    }

    it.next(result);
  }

  go();
}

run(function* (done) {
  let firstFile;

  try {
    let dirFiles = yield fs.readdir('NoNoNoNo', done); // No such dir
    firstFile = dirFiles[0];
  } catch (error) {
    firstFile = null;
  }

  console.log(firstFile);
});