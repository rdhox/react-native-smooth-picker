export default function(options, index, layout, item, horizontal) {
  const newOptions = options.slice();
  newOptions[index] = {
    layout,
    item,
    index
  };

  for (let index in newOptions) {
    if (horizontal) {
      let left = newOptions[index - 1] ? newOptions[index - 1].right : 0;
      let right = newOptions[index - 1]
        ? left + newOptions[index].layout.width
        : newOptions[index].layout.width;
      newOptions[index].right = right;
      newOptions[index].left = left;
    } else {
      let top = newOptions[index - 1] ? newOptions[index - 1].bottom : 0;
      let bottom = newOptions[index - 1]
        ? top + newOptions[index].layout.height
        : newOptions[index].layout.height;
      newOptions[index].bottom = bottom;
      newOptions[index].top = top;
    }
  }
  return newOptions;
}
