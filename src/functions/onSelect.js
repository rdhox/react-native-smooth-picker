export default function(nativeEvent, options, handleSelection, horizontal) {
  const cursor = horizontal
    ? nativeEvent.contentOffset.x
    : nativeEvent.contentOffset.y;

  options.map(option => {
    if (horizontal) {
      if (cursor >= option.left && cursor < option.right) {
        return handleSelection(option.item, option.index, cursor);
      }
    } else {
      if (cursor >= option.top && cursor < option.bottom) {
        return handleSelection(option.item, option.index, cursor);
      }
    }
  });
}
