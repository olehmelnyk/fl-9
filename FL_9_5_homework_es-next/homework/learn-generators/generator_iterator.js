function* factorial(n) {
  let result = 1;

  for (let i = 1; i <= n; i++) {
    result *= i;
    yield result;
  }
}

for (let n of factorial(5)) {
  console.log(n);
}