import React, { PureComponent } from "react";
import {
  StyleSheet,
  View,
  PermissionsAndroid,
} from "react-native";
import Geolocation from "react-native-geolocation-service";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import FeatherIcon from "react-native-vector-icons/Feather";
import GestureRecognizer from "react-native-swipe-gestures";
import { connect } from "react-redux";

import DateAndCityName from "./DateAndCityName";
import OneDayWeather from "./OneDayWeather";
import SunPath from "./SunPath";
import { getOneDayWeather, getFiveDayWeather, setColorAccordingToWeather } from "../redux/store";
import LoadingScreen from "./LoadingScreen";

class HomeScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      defColor: "#FBC244",
      fontColor: "#3C3C3B",
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
            const { sunrise, sunset } = this.props.oneDayWeatherInfo.sys;
            this.props.setColorAccordingToWeather(sunrise, sunset);
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
    const { loading, screenColors } = this.props;
    
    const combineMainStyles = StyleSheet.flatten([screenColors, styles.body]);
    
    const config = {
      velocityThreshold: 0.1,
      directionalOffsetThreshold: 80
    };

    if (!loading) {
      return (
        <GestureRecognizer
          onSwipeUp={() =>
            this.props.navigation.navigate("Details", {
              defaultStyles: combineMainStyles,
              config
            })
          }
          config={config}
          style={[screenColors, styles.body]}
        >
          <DateAndCityName />
          <OneDayWeather />
          <SunPath />

          <View style={styles.showDetailsIcon}>
            <MaterialCommunityIcon
              name="chevron-double-down"
              size={45}
              color={this.props.screenColors.color}
              onPress={() =>
                this.props.navigation.navigate("Details", {
                  defaultStyles: combineMainStyles
                })
              }
            />
          </View>
        </GestureRecognizer>
      );
    } else {
      return (
        <View style={[screenColors, styles.loadingScreen]}>
        <LoadingScreen/>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  body: {
    margin: 0,
    flex: 1,
    fontSize: 10,
    color: "white"
  },
  showDetailsIcon: {
    alignItems: "center"
  },
  loadingScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

const mapStateToProps = state => {
  const { oneDayWeather, loading } = state.oneDayWeatherReducer;
  return {
    oneDayWeatherInfo: oneDayWeather,
    loading,
    screenColors: state.setColorReducer.colors
  };
};

const mapDispatchToProps = {
  getOneDayWeather,
  getFiveDayWeather,
  setColorAccordingToWeather
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
