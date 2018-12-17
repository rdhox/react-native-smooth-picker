export default function(
  nativeEvent,
  selected,
  options,
  handleSelection,
  scrollPosition,
  horizontal
) {
  const cursor = horizontal
    ? nativeEvent.contentOffset.x
    : nativeEvent.contentOffset.y;

  const direction = horizontal
    ? scrollPosition > cursor
      ? "right"
      : "left"
    : scrollPosition > cursor
    ? "down"
    : "top";

  switch (direction) {
    case "left":
      if (options[selected + 1]) {
        if (cursor > options[selected].right) {
          handleSelection(
            options[selected + 1].item,
            options[selected + 1].index,
            cursor
          );
        }
      }
      break;
    case "right":
      if (options[selected - 1]) {
        if (cursor < options[selected].left) {
          handleSelection(
            options[selected - 1].item,
            options[selected - 1].index,
            cursor
          );
        }
      }
      break;
    case "top":
      if (options[selected + 1]) {
        if (cursor > options[selected].bottom) {
          handleSelection(
            options[selected + 1].item,
            options[selected + 1].index,
            cursor
          );
        }
      }
      break;
    case "down":
      if (options[selected - 1]) {
        if (cursor < options[selected].top) {
          handleSelection(
            options[selected - 1].item,
            options[selected - 1].index,
            cursor
          );
        }
      }
      break;
    default:
      break;
  }
}
