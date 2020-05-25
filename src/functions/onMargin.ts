export function marginStart(
  horizontal: boolean | null,
  index: number,
  size: number,
  offset: number,
  manualMargin: number | undefined
) {
  return horizontal
    ? index === 0
      ? manualMargin
        ? manualMargin
        : size / 2 + offset
      : 0
    : 0;
}
export function marginEnd(
  horizontal: boolean | null,
  length: number,
  index: number,
  size: number,
  offset: number,
  manualMargin: number | undefined
) {
  return horizontal
    ? index === length
      ? manualMargin
        ? manualMargin
        : size / 2 - offset
      : 0
    : 0;
}
