import React, { PureComponent } from "react";
import { StyleSheet, View, PermissionsAndroid, Text } from "react-native";
import Geolocation from "react-native-geolocation-service";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import GestureRecognizer from "react-native-swipe-gestures";

import DateAndCityName from "./DateAndCityName";
import OneDayWeather from "./OneDayWeather";
import SunPath from "./SunPath";
import { getOneDayWeather, getFiveDayWeather } from "../redux/store";
import { connect } from "react-redux";

class HomeScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      defColor: "#FBC244",
      fontColor: "#3C3C3B"
    };
  }

  getLocation = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Cool Location Permission",
          message:
            "Cool Location App needs access to your location " +
            "so you can take awesome forecast.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          async position => {
            await this.props.getOneDayWeather(position.coords);
            await this.props.getFiveDayWeather(position.coords);
          },
          error => {
            console.log(error.code, error.message);
          },
          {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 10000
          }
        );
        console.log("You can use location");
      } else {
        console.log("location permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  componentDidMount() {
    this.getLocation();
  }

  render() {
    const dynamicStyles = {
      backgroundColor: this.state.defColor,
      color: this.state.fontColor
    };
    const combineStyles = StyleSheet.flatten([dynamicStyles, styles.body]);
    const { loading } = this.props;
    const config = {
      velocityThreshold: 0.1,
      directionalOffsetThreshold: 80
    };

    if (!loading) {
      return (
        <GestureRecognizer
          onSwipeUp={() =>
            this.props.navigation.navigate("Details", {
              defaultStyles: combineStyles,
              config
            })
          }
          config={config}
          style={combineStyles}
        >
          <DateAndCityName />
          <OneDayWeather />
          <SunPath />

          <View style={styles.showDetailsIcon}>
            <MaterialCommunityIcon
              name="chevron-double-down"
              size={45}
              color={"#3C3C3B"}
              onPress={() =>
                this.props.navigation.navigate("Details", {
                  defaultStyles: combineStyles
                })
              }
            />
          </View>
        </GestureRecognizer>
      );
    } else {
      return (
        <View>
          <Text>loading...</Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  body: {
    margin: 0,
    flex: 1,
    fontSize: 10
  },
  showDetailsIcon: {
    alignItems: "center"
  }
});

const mapStateToProps = state => {
  const { oneDayWeather, loading } = state.oneDayWeatherReducer;
  return {
    oneDayWeatherInfo: oneDayWeather,
    loading
  };
};

const mapDispatchToProps = {
  getOneDayWeather,
  getFiveDayWeather
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
