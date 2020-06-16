## React Native Smooth Picker

[example]: https://github.com/rdhox/react-native-smooth-picker/blob/master/assets/demo.gif "example react-native-smooth-picker"

![alt text][example]

## DEMO

https://snack.expo.io/@rdhox/smoothpicker

Flash for expo app:   

<img src="https://github.com/rdhox/react-native-smooth-picker/blob/master/assets/expo.png" alt="expo" width="250"/>


## install

```
yarn add react-native-smooth-picker
```

A React Native picker coded in TypeScript that used Flatlist component to easily display vertical or horizontal list.  
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
| startMargin          |                                 Values of margins at the ends of the list are calculated automatically. If values do not correspond to your need, you can enter them manually.                                  |  number  |          |
| endMargin            |                                 Values of margins at the ends of the list are calculated automatically. If values do not correspond to your need, you can enter them manually.                                  |  number  |          |
| selectOnPress | Activate the item selection by pressing it (add a TouchableOpacity component around your item) | boolean | false |
| styleButton | Style of the TouchableOpacity if selectOnPress is true | View.style | {} |
| activeOpacityButton | Determines what the opacity of the wrapped view should be when selectOnPress is true. | number | 0.2 |


### Using Flatlist's methods

To use flatlist's methods with SmoothPicker, pass to the props "refFlatList" a ref create by "useRef" or React.CreateRef() (see `/example/example.js`).

### __!! Important !!__

 1. To avoid strange behaviour, be sure that your list's items have a define `width` or `height` (depending if the list is horizontal or vertical).
 2. To be able to scroll and select the items at the ends of the list, a View component contain the Flatlist component to create margin. Those margins are calculated automatically, but you can also enter their value with the props `startMargin` and `endMargin`.

 __=> Being aware of those two points should help you having a good behaviour. You can add a `View` component around the Smoothpicker to make it goes with your UI. Example to have the list centered at the mount:__

```javascript
...

function handleChange(index) {
  if(!startedToScroll) {
    setStartedToScroll(true);
  }
  setIndexSelected(index);
}

...

<WrapperList start={!startedToScroll} >
  <SmoothPicker
    data={list}
    keyExtractor={item => `${item.id}-list`}
    initialScrollToIndex={indexSelected}
    scrollAnimation
    showsVerticalScrollIndicator={false}
    onSelected={({ item, index }) => handleChange(index)}
    renderItem={({item, index}) => <Item>...</Item>}
  />
</WrapperList>

...

const WrapperList = styled.View`
  width: 100%;
  height: 350px;
  justify-content: center;
  align-items: center;
  padding-top: ${({start}) => start ? '150px' : '0px'};
`;
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
