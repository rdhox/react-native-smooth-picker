import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, FlatList, Text, Dimensions } from "react-native";

class SmoothPicker extends PureComponent {
  state = {
    selected: this.props.initialScrollIndex,
    screenWidth: Dimensions.get("window").width,
    screenHeight: Dimensions.get("window").height
  };

  onIsSelected = (tabOptions, onSelected, deltaSelection, offsetSelection) => {
    const { selected, screenWidth, screenHeight } = this.state;
    this.refs.Parent_View.measureInWindow((parentX, y, parentWidth, height) => {
      tabOptions.forEach(option => {
        const [ref, item, index] = option;
        const minItemToTest = selected <= 10 ? 0 : selected - 10;
        const maxItemToTest = selected + 10;
        if (index >= minItemToTest && index <= maxItemToTest) {
          if (ref) {
            ref.measureInWindow((X, Y, width, height) => {
              if (X >= 0 && X <= screenWidth) {
                const gapToParentXBorder = X + width / 2 - parentX;
                const leftLimit =
                  parentWidth / 2 + offsetSelection - deltaSelection;
                const rightLimit =
                  parentWidth / 2 + offsetSelection + deltaSelection;
                if (
                  gapToParentXBorder >= leftLimit &&
                  gapToParentXBorder <= rightLimit
                ) {
                  if (index !== selected) {
                    onSelected(item, index);
                    this.setState({ selected: index });
                  }
                }
              }
            });
          }
        }
      });
    });
  };

  render() {
    const {
      data,
      selectedStyle,
      onSelected,
      deltaSelection,
      offsetSelection,
      initialScrollIndex
    } = this.props;
    const refTab = [];
    return (
      <View style={styles.container} ref="Parent_View">
        <FlatList
          {...this.props}
          data={data}
          keyExtractor={(_, index) => index.toString()}
          initialScrollIndex={initialScrollIndex}
          ref="List_Item"
          onScroll={() =>
            this.onIsSelected(
              refTab,
              onSelected,
              deltaSelection,
              offsetSelection
            )
          }
          onMomentumScrollEnd={() => console.log("momentum down!")}
          renderItem={({ item, index }) => (
            <View style={styles.containerItem}>
              {typeof item === "number" || typeof item === "string" ? (
                <Text
                  ref={ref => refTab.push([ref, item, index])}
                  style={index === this.state.selected ? selectedStyle : {}}
                >
                  {item}
                </Text>
              ) : (
                <View
                  ref={ref => refTab.push([ref, item, index])}
                  style={index === this.state.selected ? selectedStyle : {}}
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
  container: {
    borderWidth: 1,
    borderColor: "red"
  },
  containerItem: {
    width: 30,
    height: 15,
    borderWidth: 1,
    color: "blue",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 15,
    marginRight: 15
  }
});

SmoothPicker.defaultProps = {
  data: Array.from({ length: 100 }, (_, i) => 0 + i),
  onSelected: (item, index) => ({ item: item, index: index }),
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
