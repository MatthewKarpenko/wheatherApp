import React, { Component } from "react";
import { StyleSheet, View, StatusBar } from "react-native";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import GestureRecognizer from "react-native-swipe-gestures";
import { connect } from "react-redux";

import CurrentDayDetails from "./CurrentDayDetails";
import FiveDaysWeather from "./FiveDaysWeather";


class DetailsScreen extends Component {
  render() {
    const { navigation, screenColors } = this.props;
    const defStyles = navigation.getParam("defaultStyles", {
      backgroundColor: "#FBC244",
      margin: 0,
      flex: 1,
      fontSize: 10
    });
    
    const config = navigation.getParam("config", {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80
    });

    return (
      <GestureRecognizer
        onSwipeDown={() => navigation.goBack()}
        config={config}
        style={defStyles}
      >
        <View style={styles.showDetailsIcon}>
          <MaterialCommunityIcon
            name="chevron-double-up"
            size={45}
            color={screenColors.color}
            onPress={() => navigation.goBack()}
          />
          <MaterialCommunityIcon
            name="cloud-search-outline"
            size={35}
            color={screenColors.color}
            style={styles.searchCityIcon}
            onPress={() =>  navigation.navigate("StartScreen", {})}
          />
          <CurrentDayDetails />
          <FiveDaysWeather />
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

const mapStateToProps = state => {
  return {
    screenColors: state.setColorReducer.colors
  };
};


export default connect(
  mapStateToProps,
  {}
)(DetailsScreen);