export function SelectionItem(
  horizontal,
  parentRef,
  selected,
  tabOptions,
  onSelected,
  deltaSelection,
  offsetSelection,
  handleSelection
) {
  parentRef.measureInWindow((parentX, parentY, parentWidth, parentHeight) => {
    const startLimit =
        (horizontal ? parentWidth : parentHeight) / 2 +
        offsetSelection -
        deltaSelection,
      endLimit =
        (horizontal ? parentWidth : parentHeight) / 2 +
        offsetSelection +
        deltaSelection;

    tabOptions
      .filter(
        option =>
          option[2] >= (selected <= 10 ? 0 : selected - 9) &&
          option[2] <= selected + 9
      )
      .forEach(([ref, item, index]) => {
        if (ref) {
          ref.measureInWindow((X, Y, width, height) => {
            const gapToParent =
              (horizontal ? X : Y) +
              (horizontal ? width : height) / 2 -
              (horizontal ? parentX : parentY);
            if (gapToParent >= startLimit && gapToParent <= endLimit) {
              if (index !== selected) {
                onSelected({ item: item, index: index });
                handleSelection(index);
              }
            }
          });
        }
      });
  });
}

export function marginStart(horizontal, index, size, pos, offset) {
  return horizontal ? (index === 0 ? size / 2 - pos + offset : 0) : 0;
}
export function marginEnd(horizontal, length, index, size, pos, offset) {
  return horizontal ? (index === length ? size / 2 - pos - offset : 0) : 0;
}
