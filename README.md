## React Native Smooth Picker

[example]: https://github.com/rdhox/react-native-smooth-picker/blob/master/assets/demo.gif "example react-native-smooth-picker"

![alt text][example]

## install

```
npm i react-native-smooth-picker
```

A React Native picker that used Flatlist component to easily display vertical or horizontal list.  
The item in the middle of the list (per default) is selected. Work exactly like a Flatlist component with the additionnals props:

### Props

| Props                |                                                                                                      Description                                                                                                       |   Type   |  Default |
| -------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :------: | -------: |
| onSelected           |                                                                        function that have for argument ({ item, index }) of the selected item.                                                                         | function |          |
| offsetSelection      |                                                                 offset to move the abstract line from the middle of the list where items are selected                                                                  |  number  |        0 |
| magnet               |                                                                                       scroll automatically on the selected item                                                                                        | boolean  |    false |
| initialScrollToIndex |                                                                           if you want the list to scroll to an initial index after mounting                                                                            |  number  |          |
| scrollAnimation      |                                                                                       true if you want the scroll te be animated                                                                                       | boolean  |    false |
| snapInterval         | if all items of the list have the same height (vertical) or width (horizontal), enter the dimension here to activate the snapToInterval props. Notice that if you use this prop, the magnet comportment will not work. |  number  |     null |
| snapToAlignment      |                                                                   If you use snapInterval, you can set snapToAlignment to 'start', 'center', 'end'.                                                                    |   enum   | 'center' |

### Using Flatlist's methods

To use flatlist's methods with SmoothPicker, use the reference name "smoothPicker" (see `/example/example.js`) :

```javascript
this.myref.refs.smoothPicker.scrollToIndex();
```

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
    const { selected } = this.state;
    return (
      <SmoothPicker
        offsetSelection={40}
        magnet
        scrollAnimation
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
