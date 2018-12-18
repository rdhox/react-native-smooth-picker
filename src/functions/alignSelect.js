export default function(horizontal, scrollAnimation, option, refFlatlist) {
  try {
    if (option) {
      let newPosition = horizontal
        ? option.left + option.layout.width / 2
        : option.top + option.layout.width / 2;

      refFlatlist.scrollToOffset({
        offset: newPosition,
        animated: scrollAnimation
      });
    }
  } catch (e) {
    console.log("error", e);
  }
}
