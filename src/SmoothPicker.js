import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, FlatList } from "react-native";
import onSelect from "./functions/onSelect";
import onSave from "./functions/onSave";
import alignSelect from "./functions/alignSelect";
import { marginStart, marginEnd } from "./functions/onMargin";

class SmoothPicker extends Component {
  widthParent = null;
  heightParent = null;
  xParent = null;
  yParent = null;
  options = [];

  state = {
    selected: this.props.initialScrollToIndex || 0,
    scrollPosition: 0
  };

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.selected !== this.state.selected;
  }

  componentDidMount() {
    const {
      data,
      onSelected,
      initialScrollToIndex,
      initialDelayAnimation
    } = this.props;
    const { selected } = this.state;

    if (initialScrollToIndex) {
      onSelected({ item: data[selected], index: selected });
      setTimeout(
        () =>
          alignSelect(
            this.props.horizontal,
            this.props.scrollAnimation,
            this.options[this.state.selected],
            this.state.scrollPosition,
            this.refs["smoothPicker"],
            null,
            true
          ),
        initialDelayAnimation
      );
    }
  }

  _handleSelection = (item, index, scrollPosition) => {
    this.props.onSelected({ item, index });
    this.setState({
      selected: index,
      scrollPosition: scrollPosition
    });
  };

  _renderItem = info => {
    const { data, renderItem, horizontal, offsetSelection } = this.props;
    const { item, index } = info;
    return (
      <View
        key={index}
        onLayout={({ nativeEvent: { layout } }) => {
          this.options = onSave(this.options, index, layout, item, horizontal);
        }}
        style={{
          marginLeft: marginStart(
            horizontal,
            index,
            this.widthParent,
            this.xParent,
            offsetSelection
          ),
          marginRight: marginEnd(
            horizontal,
            data.length - 1,
            index,
            this.widthParent,
            this.xParent,
            offsetSelection
          ),
          marginTop: marginStart(
            !horizontal,
            index,
            this.heightParent,
            this.yParent,
            offsetSelection
          ),
          marginBottom: marginEnd(
            !horizontal,
            data.length - 1,
            index,
            this.heightParent,
            this.yParent,
            offsetSelection
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
      <View
        onLayout={({ nativeEvent: { layout } }) => {
          this.widthParent = layout.width;
          this.heightParent = layout.height;
          this.xParent = layout.x;
          this.yParent = layout.y;
        }}
      >
        <FlatList
          {...this.props}
          {...snap}
          onScroll={({ nativeEvent }) =>
            onSelect(
              nativeEvent,
              this.state.selected,
              this.options,
              this._handleSelection,
              this.state.scrollPosition,
              horizontal
            )
          }
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
          renderItem={this._renderItem}
          ref={"smoothPicker"}
        />
      </View>
    );
  }
}

SmoothPicker.defaultProps = {
  onSelected: data => data,
  horizontal: false,
  offsetSelection: 0,
  decelerationRate: 0.85,
  initialScrollToIndex: null,
  magnet: false,
  scrollAnimation: false,
  initialDelayAnimation: 150,
  snapInterval: null,
  snapToAlignment: "center"
};

SmoothPicker.propTypes = {
  onSelected: PropTypes.func.isRequired,
  offsetSelection: PropTypes.number.isRequired,
  initialScrollToIndex: PropTypes.number,
  scrollAnimation: PropTypes.bool.isRequired,
  initialDelayAnimation: PropTypes.number.isRequired,
  magnet: PropTypes.bool.isRequired,
  snapInterval: PropTypes.number
};

export default SmoothPicker;
