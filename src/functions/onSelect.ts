import { NativeScrollEvent } from 'react-native';
import { Option, HandleSelection } from '../SmoothPicker';
export default function(
  nativeEvent: NativeScrollEvent,
  selected: number,
  options: Option[],
  handleSelection: HandleSelection,
  scrollPosition: number | null,
  horizontal: boolean | null
) {
  const cursor = horizontal
    ? nativeEvent.contentOffset.x
    : nativeEvent.contentOffset.y;


  let SP: number = scrollPosition || 0;
  if (scrollPosition === null) {
    if (options[selected]) {
      const option = options[selected];
      SP = horizontal ? option.left : option.top;
    }
  }

  const direction = horizontal
    ? SP > cursor
      ? 'right'
      : 'left'
    : SP > cursor
    ? 'down'
    : 'top';

  switch (direction) {
    case 'left':
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
    case 'right':
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
    case 'top':
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
    case 'down':
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
