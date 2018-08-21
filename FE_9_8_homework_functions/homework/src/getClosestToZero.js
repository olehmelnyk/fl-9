function getClosestToZero() {
    return [...arguments].reduce((prev, curr) => Math.abs(curr) < Math.abs(prev) ? curr : prev);
}