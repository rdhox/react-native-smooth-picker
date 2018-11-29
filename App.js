import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import SmoothPicker from "./src/SmoothPicker";

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <SmoothPicker
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            alwaysBounceHorizontal={true}
            onScrollToIndexFailed={() => {}}
            bounces={true}
            offsetSelection={0}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  wrapper: {
    width: 300,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    margin: "auto",
    color: "black",
    backgroundColor: "pink"
  }
});
