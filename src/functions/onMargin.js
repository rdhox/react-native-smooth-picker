export function marginStart(horizontal, index, size, pos, offset) {
  return horizontal ? (index === 0 ? size / 2 - pos + offset : 0) : 0;
}
export function marginEnd(horizontal, length, index, size, pos, offset) {
  return horizontal ? (index === length ? size / 2 - pos - offset : 0) : 0;
}
