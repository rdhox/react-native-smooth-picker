export function isSelected(
  parentRef,
  selected,
  tabOptions,
  onSelected,
  deltaSelection,
  offsetSelection,
  handeSelection
) {
  parentRef.measureInWindow((parentX, y, parentWidth, height) => {
    const leftLimit = parentWidth / 2 + offsetSelection - deltaSelection,
      rightLimit = parentWidth / 2 + offsetSelection + deltaSelection;
    tabOptions.forEach(([ref, item, index]) => {
      if (ref) {
        if (
          index >= (selected <= 10 ? 0 : selected - 9) &&
          index <= selected + 9
        ) {
          ref.measureInWindow((X, Y, width, height) => {
            const gapToParentXBorder = X + width / 2 - parentX;
            if (
              gapToParentXBorder >= leftLimit &&
              gapToParentXBorder <= rightLimit
            ) {
              if (index !== selected) {
                onSelected({ item: item, index: index });
                handeSelection(index);
              }
            }
          });
        }
      }
    });
  });
}
