## React Native Smooth Picker

[example]: https://github.com/rdhox/react-native-smooth-picker/blob/optimization/assets/demo.gif "example react-native-smooth-picker"

![alt text][example]

## install

```
npm i react-native-smooth-picker
```

A React Native picker that used Flatlist component to easily display vertical or horizontal list.  
The item in the middle of the list (per default) is selected. Work exactly like a Flatlist component with the additionnals props:

### Ref

| Props                 |                                                                   Description                                                                    |   Type   | Default |
| --------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------: | :------: | ------: |
| onSelected            |                                     function that have for argument ({ item, index }) of the selected item.                                      | function |         |
| offsetSelection       |                              offset to move the abstract line from the middle of the list where items are selected                               |  number  |       0 |
| magnet                |                                                    scroll automatically on the selected item                                                     | boolean  |   false |
| initialScrollToIndex  |                                        if you want the list to scroll to an initial index after mounting                                         |  number  |    null |
| scrollAnimation       |                                                    true if you want the scroll te be animated                                                    | boolean  |    true |
| initialDelayAnimation |                                              delay of the start of the inital scroll after mounting                                              |  number  |     150 |
| fixedItemsLength      | if all the items of the list have the same height (vertical) or width (horizontal), enter the dimension here to activate the getItemLayout prop. |  number  |    null |

### Simple Example

```javascript
import SmoothPicker from "react-native-smooth-picker";

export default class App extends Component {
  state = {
    selected: null
  };

  handleChange = index => {
    this.setState({
      selected: index
    });
  };

  render() {
    return (
      <SmoothPicker
        offsetSelection={40}
        magnet
        data={Array.from({ length: 16 }, (_, i) => i)}
        onSelected={({ item, index }) => this.handleChange(index)}
        renderItem={({ item, index }) => (
          <Number selected={index === selected}>{item}</Number>
        )}
      />
    );
  }
}
```

You can find the code of the gif above in the `example/` folder.

### Author

[rdhox](https://github.com/rdhox) - [Steed Monteiro](https://github.com/SteedMonteiro)
