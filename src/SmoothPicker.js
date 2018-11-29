import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, FlatList, Text } from "react-native";
import { isSelected } from "./logic";

class SmoothPicker extends PureComponent {
  state = {
    selected: this.props.initialScrollIndex
  };

  handeSelection = index => {
    this.setState({ selected: index });
  };

  render() {
    const {
      data,
      selectedStyle,
      onSelected,
      deltaSelection,
      offsetSelection,
      initialScrollIndex,
      decelerationRate
    } = this.props;

    const { selected } = this.state;
    const refTab = [];
    return (
      <View style={styles.container} ref="Parent_View">
        <FlatList
          {...this.props}
          data={data}
          keyExtractor={(_, index) => index.toString()}
          initialScrollIndex={initialScrollIndex}
          ref="List_Item"
          decelerationRate={decelerationRate ? decelerationRate : 0.6}
          onScroll={() =>
            isSelected(
              this.refs.Parent_View,
              selected,
              refTab,
              onSelected,
              deltaSelection,
              offsetSelection,
              this.handeSelection
            )
          }
          renderItem={({ item, index }) => (
            <View style={styles.containerItem}>
              {typeof item === "number" || typeof item === "string" ? (
                <Text
                  ref={ref => refTab.push([ref, item, index])}
                  style={index === selected ? selectedStyle : {}}
                >
                  {item}
                </Text>
              ) : (
                <View
                  ref={ref => refTab.push([ref, item, index])}
                  style={index === selected ? selectedStyle : {}}
                >
                  {item}
                </View>
              )}
            </View>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  containerItem: {
    width: 30,
    height: 15,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 15,
    marginRight: 15
  }
});

SmoothPicker.defaultProps = {
  data: Array.from({ length: 100 }, (_, i) => 0 + i),
  onSelected: data => data,
  selectedStyle: {
    color: "red",
    fontWeight: "bold"
  },
  offsetSelection: 0,
  deltaSelection: 15,
  initialScrollIndex: 5
};

SmoothPicker.propTypes = {
  data: PropTypes.array.isRequired,
  onSelected: PropTypes.func.isRequired,
  selectedStyle: PropTypes.object.isRequired,
  offsetSelection: PropTypes.number,
  deltaSelection: PropTypes.number,
  initialScrollIndex: PropTypes.number
};

export default SmoothPicker;
