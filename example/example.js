import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import SmoothPicker from "../src/SmoothPicker";

const Bubble = props => {
  const { children, selected, horizontal } = props;
  return (
    <View
      style={[
        horizontal ? styles.itemStyleHorizontal : styles.itemStyleVertical,
        selected &&
          (horizontal
            ? styles.itemSelectedStyleHorizontal
            : styles.itemSelectedStyleVertical)
      ]}
    >
      <Text
        style={{
          textAlign: "center",
          fontSize: selected ? 20 : 17,
          color: selected ? "black" : "grey",
          fontWeight: selected ? "bold" : "normal"
        }}
      >
        {children}
      </Text>
    </View>
  );
};

export default class App extends Component {
  state = {
    selected: null
  };

  handleChange(index) {
    this.setState(
      {
        selected: index
      },
      () =>
        this.refList.scrollToIndex({
          animated: false,
          index: index,
          viewOffset: 120
        })
    );
  }

  render() {
    const { selected } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.wrapperHorizontal}>
          <SmoothPicker
            onScrollToIndexFailed={() => {}}
            ref={ref => (this.refList = ref)}
            keyExtractor={(_, index) => index.toString()}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            bounces={true}
            data={Array.from({ length: 16 }, (_, i) => 0 + i)}
            renderItem={({ item, index }) => (
              <Bubble horizontal selected={index === selected}>
                {item}
              </Bubble>
            )}
          />
        </View>
        <View style={styles.wrapperVertical}>
          <SmoothPicker
            initialScrollToIndex={5}
            magnet
            scrollAnimation
            onScrollToIndexFailed={() => {}}
            keyExtractor={(_, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            bounces={true}
            offsetSelection={70}
            data={Array.from({ length: 16 }, (_, i) => 0 + i)}
            onSelected={({ item, index }) => this.handleChange(index)}
            renderItem={({ item, index }) => (
              <Bubble selected={index === selected}>{item}</Bubble>
            )}
          />
        </View>
        <View>
          <Text>{`Your selection is ${selected}`}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingBottom: 30,
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  wrapperHorizontal: {
    width: 300,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    margin: "auto",
    color: "black",
    marginBottom: 80
  },
  wrapperVertical: {
    width: 100,
    height: 300,
    justifyContent: "center",
    alignItems: "center",
    margin: "auto",
    color: "black"
  },
  itemStyleVertical: {
    marginTop: 10,
    marginBottom: 10,
    width: 50,
    height: 50,
    paddingTop: 13,
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 25
  },
  itemSelectedStyleVertical: {
    paddingTop: 11,
    borderWidth: 2,
    borderColor: "#DAA520"
  },
  itemStyleHorizontal: {
    marginLeft: 10,
    marginRight: 10,
    width: 50,
    height: 50,
    paddingTop: 13,
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 25
  },
  itemSelectedStyleHorizontal: {
    paddingTop: 11,
    borderWidth: 2,
    borderColor: "#DAA520"
  }
});
