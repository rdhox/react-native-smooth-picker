import React from "react";
import { ScrollView, View, Dimensions, Text } from "react-native";

const screenWidth = Dimensions.get("window").width;
const scrollViewWidth = Math.round(screenWidth * 0.9);
const cardWidth = scrollViewWidth * 0.2;
const paddingCard = scrollViewWidth * 0.02;
const scrollViewPadding = scrollViewWidth * 0.08;

const ScrollViewAlign = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ScrollView
        style={{
          flex: 0,
          backgroundColor: "#BDBDBD",
          height: screenWidth * 0.5,
          width: scrollViewWidth
        }}
        snapToAlignment={"start"}
        scrollEventThrottle={299}
        directionalLockEnabled={true}
        decelerationRate={"fast"}
        contentOffset={{
          x: 0,
          y: 0
        }}
        snapToInterval={cardWidth + paddingCard + paddingCard + 1}
        renderRow={this.renderRow}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
      >
        <View
          style={{
            backgroundColor: "#F44336",
            width: cardWidth,
            marginLeft: paddingCard + scrollViewPadding,
            marginRight: paddingCard
          }}
        >
          <Text>First Card</Text>
        </View>
        <View
          style={{
            backgroundColor: "#9C27B0",
            width: cardWidth,
            marginHorizontal: paddingCard
          }}
        >
          <Text>Second Card</Text>
        </View>
        <View
          style={{
            backgroundColor: "#E91E63",
            width: cardWidth,
            marginHorizontal: paddingCard
          }}
        >
          <Text>Third Card</Text>
        </View>
        <View
          style={{
            backgroundColor: "#FF5722",
            width: cardWidth,
            marginHorizontal: paddingCard
          }}
        >
          <Text>Third Card</Text>
        </View>
        <View
          style={{
            backgroundColor: "#00E676",
            width: cardWidth,
            marginHorizontal: paddingCard
          }}
        >
          <Text>Third Card</Text>
        </View>
        <View
          style={{
            backgroundColor: "#00B0FF",
            width: cardWidth,
            marginHorizontal: paddingCard
          }}
        >
          <Text>Third Card</Text>
        </View>
        <View
          style={{
            backgroundColor: "#1A237E",
            width: cardWidth,
            marginRight: paddingCard + scrollViewPadding,
            marginLeft: paddingCard
          }}
        >
          <Text>Third Card</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default ScrollViewAlign;
