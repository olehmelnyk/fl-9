function getFoo() {
  return new Promise((resolve, reject) => resolve('foo'));
}

function run(generator) {
  let it = generator();

  function go(result) {
    if (result.done) {
      return result.value;
    }

    return result.value.then(
        value => go(it.next(value)),
        error => go(it.throw(error)),
    );
  }

  go(it.next());
}

run(function* () {
  try {
    console.log(yield getFoo());
  } catch (error) {
    console.log(error);
  }
});