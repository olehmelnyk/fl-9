function getClosestToZero() {
  return [...arguments].sort((a, b) => Math.abs(a) - Math.abs(b))[0];
}