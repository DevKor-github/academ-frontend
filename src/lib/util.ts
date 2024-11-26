export function lengthOf(n: number, from = 0) {
  return new Array(n).fill(null).map((_, i) => i + from);
}
