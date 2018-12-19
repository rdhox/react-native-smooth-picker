export function marginStart(horizontal, index, size, offset, manualMargin) {
  return horizontal
    ? index === 0
      ? manualMargin
        ? manualMargin
        : size / 2 + offset
      : 0
    : 0;
}
export function marginEnd(
  horizontal,
  length,
  index,
  size,
  offset,
  manualMargin
) {
  return horizontal
    ? index === length
      ? manualMargin
        ? manualMargin
        : size / 2 - offset
      : 0
    : 0;
}
