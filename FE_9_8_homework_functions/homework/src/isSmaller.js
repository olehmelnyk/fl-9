function isSmaller(a, b) {
  // return a < b; // <- the preferred option - no dependency needed, no boolean flip...
  return !isBigger(a, b) && a !== b;
}