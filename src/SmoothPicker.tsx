import React, { Component } from 'react';
import {
  View,
  FlatList as RNFlatList,
  TouchableOpacity,
  LayoutRectangle,
  FlatListProps,
  ListRenderItemInfo,
  StyleProp,
  ViewStyle,
} from 'react-native';
import onSelect from './functions/onSelect';
import alignSelect from './functions/alignSelect';
import { marginStart, marginEnd } from './functions/onMargin';
import {FlatList as GHFlatList} from 'react-native-gesture-handler';

export interface ListReturn {
  item: any;
  index: number;
}

export interface Option extends ListReturn {
  layout: LayoutRectangle,
  left: number;
  top: number;
  right: number;
  bottom: number;
}

export type SnapAlignement = 'start' | 'center' | 'end';

export interface Snap {
  snapToInterval: number,
  snapToAlignment: SnapAlignement,
}

export type HandleSelection =  (item: any, index: number, scrollPosition: number | null) => void;

interface Props extends FlatListProps<any> {
  onSelected?: (obj: ListReturn) => void;
  offsetSelection?: number;
  magnet?: boolean;
  scrollAnimation?: boolean;
  snapInterval?: number | null;
  snapToAlignment?: SnapAlignement;
  initialScrollToIndex?: number;
  startMargin?: number;
  endMargin?: number;
  refFlatList?: React.MutableRefObject<RNFlatList | null>;
  selectOnPress?: boolean;
  styleButton?:  StyleProp<ViewStyle>;
  activeOpacityButton?: number;
  flatListType?: string;
}

interface State {
  selected: number;
  scrollPosition: number | null;
}

class SmoothPicker extends Component<Props, State> {
  widthParent: number = 0;
  heightParent: number = 0;
  onMomentum: boolean = false;
  fingerAction: boolean = false;
  options: Option[] = [];
  countItems: number = 0;
  refList: React.RefObject<RNFlatList> = React.createRef();

  state = {
    selected: this.props.initialScrollToIndex || 1,
    scrollPosition: null,
  };

  componentDidMount() {
    if (this.props.refFlatList) {
      this.props.refFlatList.current = this.refList.current;
    }
  }

  _alignAfterMount = () => {
    try {
      const {
        horizontal = false,
        scrollAnimation = false,
        initialScrollToIndex,
      } = this.props;
      if (typeof initialScrollToIndex !== 'undefined') {
        const option = this.options[initialScrollToIndex];
        if (option) {
          alignSelect(
            horizontal,
            scrollAnimation,
            option,
            this.refList
          );
        }
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  _save = (i: number, layout: LayoutRectangle, item: any, horizontal: boolean | null) => {
    const nOpt: Option = {
      layout,
      item,
      index: i,
      top: 0,
      bottom: 0,
      left: 0,
      right:0,
    };
    this.options[i] = nOpt;

    this.options.forEach(option => {
      const { index } = option;
      if (horizontal) {
        let left: number = this.options[index - 1] ? this.options[index - 1].right : 0;
        let right: number = this.options[index - 1]
          ? left + this.options[index].layout.width
          : this.options[index].layout.width;
        this.options[index].right = right;
        this.options[index].left = left;
      } else {
        let top: number = this.options[index - 1] ? this.options[index - 1].bottom : 0;
        let bottom: number = this.options[index - 1]
          ? top + this.options[index].layout.height
          : this.options[index].layout.height;
        this.options[index].bottom = bottom;
        this.options[index].top = top;
      }
    });
  };

  _handleSelection: HandleSelection = (item, index, scrollPosition) => {
    if (this.props.onSelected) {
      this.props.onSelected({ item, index });
    }
    this.setState({
      selected: index,
      scrollPosition: scrollPosition,
    });
  };

  _renderItem = (info: ListRenderItemInfo<any>):(JSX.Element | null) => {
    const {
      data,
      renderItem,
      horizontal = false,
      offsetSelection = 0,
      startMargin,
      endMargin,
      selectOnPress,
      styleButton = {},
      activeOpacityButton = 0.2,
    } = this.props;

    const { item, index } = info;

    const handlePressOnItem = (): void => {
      this._handleSelection(item, index, null);
    };

    if (!data) {
      return null;
    }

    return (
      <View
        key={index}
        onLayout={({ nativeEvent: { layout } }) => {
          this._save(index, layout, item, horizontal);
          if (this.countItems === data.length) {
            this.countItems = 0;
            this._alignAfterMount();
          } else {
            this.countItems = this.countItems + 1;
          }
        }}
        style={{
          marginLeft: marginStart(
            horizontal,
            index,
            this.widthParent,
            offsetSelection,
            startMargin
          ),
          marginRight: marginEnd(
            horizontal,
            data.length - 1,
            index,
            this.widthParent,
            offsetSelection,
            endMargin
          ),
          marginTop: marginStart(
            !horizontal,
            index,
            this.heightParent,
            offsetSelection,
            startMargin
          ),
          marginBottom: marginEnd(
            !horizontal,
            data.length - 1,
            index,
            this.heightParent,
            offsetSelection,
            endMargin
          ),
        }}
      >
        {renderItem && !selectOnPress && renderItem(info)}
        {renderItem && selectOnPress && (
          <TouchableOpacity
            onPress={handlePressOnItem}
            style={styleButton}
            activeOpacity={activeOpacityButton}
          >
            {renderItem(info)}
          </TouchableOpacity>
        )}
      </View>
    );
  };

  render(): JSX.Element {
    const {
      horizontal = false,
      magnet = false,
      snapInterval = null,
      snapToAlignment = 'center',
      scrollAnimation = false,
      flatListType = 'react-native',
    } = this.props;

    let snap: Snap = {} as Snap;
    if (snapInterval) {
      snap = {
        snapToInterval: snapInterval,
        snapToAlignment: snapToAlignment,
      };
    }
    const FlatList = flatListType === 'gesture-handler' ? GHFlatList : RNFlatList;
    return (
      <FlatList
        {...this.props}
        {...snap}
        onLayout={({ nativeEvent: { layout } }) => {
          this.widthParent = layout.width;
          this.heightParent = layout.height;
        }}
        onScroll={({ nativeEvent }) => {
          if (this.fingerAction) {
            onSelect(
              nativeEvent,
              this.state.selected,
              this.options,
              this._handleSelection,
              this.state.scrollPosition,
              horizontal
            );
          }
        }}
        getItemLayout={(_, index) => {
          let itemLayout;
          if (snapInterval) {
            itemLayout = {
              length: snapInterval,
              offset: snapInterval * index,
              index,
            };
          } else {
            itemLayout = {
              length: this.options[index]
                ? horizontal
                  ? this.options[index].layout.width
                  : this.options[index].layout.height
                : 30,
              offset: this.options[index]
                ? horizontal
                  ? this.options[index].left
                  : this.options[index].top
                : 30 * index,
              index,
            };
          }
          return itemLayout;
        }}
        onScrollBeginDrag={() => {
          this.onMomentum = true;
          this.fingerAction = true;
        }}
        onMomentumScrollEnd={() => {
          this.fingerAction = false;
          if (this.onMomentum && magnet && !snapInterval) {
            this.onMomentum = false;
            alignSelect(
              horizontal,
              scrollAnimation,
              this.options[this.state.selected],
              this.refList
            );
          }
        }}
        renderItem={this._renderItem}
        ref={this.refList}
      />
    );
  }
}

export default SmoothPicker;
