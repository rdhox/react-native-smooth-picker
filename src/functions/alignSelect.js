export default function(
  horizontal,
  scrollAnimation,
  option,
  scrollPosition,
  refFlatlist,
  contentOffset,
  mounting = false
) {
  try {
    if (option) {
      const startItem = horizontal ? option.left : option.top;
      const endItem = horizontal ? option.right : option.bottom;
      if (
        mounting ||
        (startItem <= contentOffset && endItem >= contentOffset)
      ) {
        let newPosition = horizontal
          ? option.left + option.layout.width / 2
          : option.top + option.layout.width / 2;
        if (newPosition !== scrollPosition) {
          refFlatlist.scrollToOffset({
            offset: newPosition,
            animated: scrollAnimation
          });
        }
      }
    }
  } catch (e) {
    console.log("error", e);
  }
}
