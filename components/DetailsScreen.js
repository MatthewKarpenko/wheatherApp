import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import GestureRecognizer from "react-native-swipe-gestures";

import CurrentDayDetails from "./CurrentDayDetails";
import FiveDaysWeather from "./FiveDaysWeather";

export default class DetailsScreen extends Component {
  render() {
    const { navigation } = this.props;
    const defStyles = navigation.getParam("defaultStyles", {
      backgroundColor: "#FBC244",
      margin: 0,
      flex: 1,
      fontSize: 10
    });
    const textColor = navigation.getParam("textColor", {
      color: { color: "#3C3C3B" }
    });
    const config = navigation.getParam("config", {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80
    });

    return (
      <GestureRecognizer
        onSwipeDown={() => this.props.navigation.goBack()}
        config={config}
        style={defStyles}
      >
        <View style={styles.showDetailsIcon}>
          <MaterialCommunityIcon
            name="chevron-double-up"
            size={45}
            color={textColor.color}
            onPress={() => this.props.navigation.goBack()}
          />
          <MaterialCommunityIcon
            name="cloud-search-outline"
            size={35}
            color={textColor.color}
            style={styles.searchCityIcon}
            onPress={() => this.props.navigation.navigate("StartScreen", {})}
          />
          <CurrentDayDetails styles={textColor} />
          <FiveDaysWeather styles={textColor} />
        </View>
      </GestureRecognizer>
    );
  }
}

const styles = StyleSheet.create({
  showDetailsIcon: {
    alignItems: "center"
  },
  searchCityIcon: {
    position: "absolute",
    top: 10,
    right: 10
  }
});
