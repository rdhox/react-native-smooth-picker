## React Native Smooth Picker

[example]: https://github.com/rdhox/react-native-smooth-picker/blob/master/assets/demo.gif "example react-native-smooth-picker"

![alt text][example]

A React Native picker that used Flatlist component to easily display vertical or horizontal list.  
The item in the middle of the list (per default) is selected. Work exactly like a Flatlist component with the additionnals props:

### Ref

| Props                    |                                      Description                                      |   Type   | Default |
| ------------------------ | :-----------------------------------------------------------------------------------: | :------: | ------: |
| onSelected               |        function that have for argument ({ item, index }) of the selected item.        | function |         |
| offsetSelection          | offset to move the abstract line from the middle of the list where items are selected |  number  |       0 |
| deltaSelection           |                width around the abstract line where items are selected                |  number  |      15 |
| initialScrollToIndex     |        true if you want the list to scroll to an initial index after mounting         | boolean  |    true |
| initialScrollAnimated    |                   true if you want the inital scroll te be animated                   | boolean  |    true |
| initalScrollToIndexDelay |                delay of the start of the inital scroll after mounting                 |  number  |     150 |

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
        initialScrollIndex={5}
        onScrollToIndexFailed={() => {}}
        keyExtractor={(_, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        bounces={true}
        offsetSelection={40}
        deltaSelection={20}
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
