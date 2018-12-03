import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { View, FlatList } from "react-native";
import { SelectionItem, marginStart, marginEnd } from "./functions/logic";

class SmoothPicker extends PureComponent {
  state = {
    selected: this.props.initialScrollIndex,
    widthParent: null,
    heightParent: null,
    xParent: null,
    yParent: null
  };

  componentDidMount() {
    const {
      horizontal,
      data,
      offsetSelection,
      onSelected,
      initialScrollToIndex,
      initialScrollAnimated,
      initalScrollToIndexDelay
    } = this.props;
    const { widthParent, heightParent, selected } = this.state;
    onSelected({ item: data[selected], index: selected });
    if (initialScrollToIndex) {
      setTimeout(() => {
        this.scrollToIndex({
          viewOffset: horizontal
            ? widthParent / 2 + offsetSelection
            : heightParent / 2 + offsetSelection,
          index: selected,
          animated: initialScrollAnimated
        });
      }, initalScrollToIndexDelay);
    }
  }

  _handleSelection = index => {
    this.setState({ selected: index });
  };

  _renderItem = refTab => info => {
    const { data, renderItem, horizontal, offsetSelection } = this.props;
    const { item, index } = info;
    return (
      <View
        key={index}
        ref={ref => refTab.push([ref, item, index])}
        onLayout={() => {}}
        style={{
          marginLeft: marginStart(
            horizontal,
            index,
            this.state.widthParent,
            this.state.xParent,
            offsetSelection
          ),
          marginRight: marginEnd(
            horizontal,
            data.length - 1,
            index,
            this.state.widthParent,
            this.state.xParent,
            offsetSelection
          ),
          marginTop: marginStart(
            !horizontal,
            index,
            this.state.heightParent,
            this.state.yParent,
            offsetSelection
          ),
          marginBottom: marginEnd(
            !horizontal,
            data.length - 1,
            index,
            this.state.heightParent,
            this.state.yParent,
            offsetSelection
          )
        }}
      >
        {renderItem(info)}
      </View>
    );
  };

  scrollToEnd(params) {
    if (this._listRef) {
      this._listRef.scrollToEnd(params);
    }
  }
  scrollToIndex(params) {
    if (this._listRef) {
      this._listRef.scrollToIndex(params);
    }
  }
  scrollToItem(params) {
    if (this._listRef) {
      this._listRef.scrollToItem(params);
    }
  }
  scrollToOffset(params) {
    if (this._listRef) {
      this._listRef.scrollToOffset(params);
    }
  }
  recordInteraction() {
    if (this._listRef) {
      this._listRef.recordInteraction();
    }
  }
  flashScrollIndicators() {
    if (this._listRef) {
      this._listRef.flashScrollIndicators();
    }
  }

  _captureRef = ref => {
    this._listRef = ref;
  };

  render() {
    const {
      horizontal,
      onSelected,
      deltaSelection,
      offsetSelection
    } = this.props;

    const { selected } = this.state;
    const refTab = [];
    return (
      <View
        onLayout={({ nativeEvent: { layout } }) => {
          this.setState({
            widthParent: layout.width,
            heightParent: layout.height,
            xParent: layout.x,
            yParent: layout.y
          });
        }}
        ref="Parent_View"
        style={{ opacity: 1 }}
      >
        <FlatList
          {...this.props}
          onScroll={() =>
            SelectionItem(
              horizontal,
              this.refs.Parent_View,
              selected,
              refTab,
              onSelected,
              deltaSelection,
              offsetSelection,
              this._handleSelection
            )
          }
          renderItem={this._renderItem(refTab)}
          ref={this._captureRef}
        />
      </View>
    );
  }
}

SmoothPicker.defaultProps = {
  onSelected: data => data,
  horizontal: false,
  offsetSelection: 0,
  deltaSelection: 15,
  initialScrollIndex: 1,
  decelerationRate: 0.85,
  initialScrollToIndex: true,
  initialScrollAnimated: true,
  initalScrollToIndexDelay: 150
};

SmoothPicker.propTypes = {
  onSelected: PropTypes.func.isRequired,
  offsetSelection: PropTypes.number.isRequired,
  deltaSelection: PropTypes.number.isRequired,
  initialScrollToIndex: PropTypes.bool.isRequired,
  initialScrollAnimated: PropTypes.bool.isRequired,
  initalScrollToIndexDelay: PropTypes.number.isRequired
};

export default SmoothPicker;
