import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, FlatList } from "react-native";
import onSelect from "./functions/onSelect";
import alignSelect from "./functions/alignSelect";
import { marginStart, marginEnd } from "./functions/onMargin";

class SmoothPicker extends Component {
  widthParent = null;
  heightParent = null;
  onMomentum = false;
  fingerAction = false;
  options = [];
  countItems = 0;

  state = {
    selected: this.props.initialScrollToIndex || 1,
    scrollPosition: null
  };

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.selected !== this.state.selected;
  }

  _alignAfterMount = () => {
    try {
      const { horizontal, scrollAnimation, initialScrollToIndex } = this.props;
      if (typeof initialScrollToIndex !== "undefined") {
        const option = this.options[initialScrollToIndex];
        if (option) {
          alignSelect(
            horizontal,
            scrollAnimation,
            option,
            this.refs["smoothPicker"]
          );
        }
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  _save = (index, layout, item, horizontal) => {
    this.options[index] = {
      layout,
      item,
      index
    };

    for (let index in this.options) {
      if (horizontal) {
        let left = this.options[index - 1] ? this.options[index - 1].right : 0;
        let right = this.options[index - 1]
          ? left + this.options[index].layout.width
          : this.options[index].layout.width;
        this.options[index].right = right;
        this.options[index].left = left;
      } else {
        let top = this.options[index - 1] ? this.options[index - 1].bottom : 0;
        let bottom = this.options[index - 1]
          ? top + this.options[index].layout.height
          : this.options[index].layout.height;
        this.options[index].bottom = bottom;
        this.options[index].top = top;
      }
    }
  };

  _handleSelection = (item, index, scrollPosition) => {
    this.props.onSelected({ item, index });
    this.setState({
      selected: index,
      scrollPosition: scrollPosition
    });
  };

  _renderItem = info => {
    const {
      data,
      renderItem,
      horizontal,
      offsetSelection,
      startMargin,
      endMargin
    } = this.props;
    const { item, index } = info;
    return (
      <View
        key={index}
        onLayout={({ nativeEvent: { layout } }) => {
          this._save(index, layout, item, horizontal);
          if (this.countItems === data.length) {
            this.countItems = 0;
            this._alignAfterMount();
          }else{
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
          )
        }}
      >
        {renderItem(info)}
      </View>
    );
  };

  render() {
    const { horizontal, magnet, snapInterval, snapToAlignment } = this.props;

    let snap = {};
    if (snapInterval) {
      snap = {
        snapToInterval: snapInterval,
        snapToAlignment: snapToAlignment
      };
    }
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
              index
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
              index
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
              this.props.horizontal,
              this.props.scrollAnimation,
              this.options[this.state.selected],
              this.refs["smoothPicker"]
            );
          }
        }}
        renderItem={this._renderItem}
        ref={"smoothPicker"}
      />
    );
  }
}

SmoothPicker.defaultProps = {
  onSelected: data => data,
  horizontal: false,
  offsetSelection: 0,
  decelerationRate: 0.85,
  magnet: false,
  scrollAnimation: false,
  snapInterval: null,
  snapToAlignment: "center"
};

SmoothPicker.propTypes = {
  onSelected: PropTypes.func.isRequired,
  offsetSelection: PropTypes.number.isRequired,
  scrollAnimation: PropTypes.bool.isRequired,
  magnet: PropTypes.bool.isRequired,
  snapInterval: PropTypes.number,
  initialScrollToIndex: PropTypes.number,
  startMargin: PropTypes.number,
  endMargin: PropTypes.number
};

export default SmoothPicker;
