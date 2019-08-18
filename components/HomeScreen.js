import React, { PureComponent } from "react";
import {
  StyleSheet,
  View,
  PermissionsAndroid,
  Animated,
  Easing
} from "react-native";
import Geolocation from "react-native-geolocation-service";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import GestureRecognizer from "react-native-swipe-gestures";
import moment from "moment";
import { connect } from "react-redux";

import DateAndCityName from "./DateAndCityName";
import OneDayWeather from "./OneDayWeather";
import SunPath from "./SunPath";
import { getOneDayWeather, getFiveDayWeather } from "../redux/store";

AnimatedIcon = Animated.createAnimatedComponent(MaterialCommunityIcon);

class HomeScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      defColor: "#FBC244",
      fontColor: "#3C3C3B",
      isLoading: false,
      isAnimating: true
    };
    this.spinValue = new Animated.Value(0);
  }

  startLoadingAnimation = () => {
    this.spinValue.setValue(0);
    Animated.timing(this.spinValue, {
      toValue: 1,
      duration: 4000,
      easing: Easing.linear,
      useNativeDriver: true
    }).start(() => this.startLoadingAnimation());
  };

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
            this.setColorAccordingToWeather(sunrise, sunset);
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

  setColorAccordingToWeather = (sunrise, sunset) => {
    let currentTimeUnix = moment().unix();

    if (currentTimeUnix >= sunrise && currentTimeUnix < sunset) {
      this.setState({
        fontColor: "#3C3C3B",
        defColor: "#FBC244"
      });
    } else {
      this.setState({
        fontColor: "#FFF",
        defColor: "#3C3C3B"
      });
    }
  };
  componentDidMount() {
    this.getLocation();
    this.startLoadingAnimation();
  }

  render() {
    const dynamicStyles = {
      backgroundColor: this.state.defColor,
      color: this.state.fontColor
    };
    const combineMainStyles = StyleSheet.flatten([dynamicStyles, styles.body]);
    const combineLoadingStyles = StyleSheet.flatten([
      dynamicStyles,
      styles.loadingScreen
    ]);
    const { loading } = this.props;
    const config = {
      velocityThreshold: 0.1,
      directionalOffsetThreshold: 80
    };

    const spin = this.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "360deg"]
    });

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
          style={combineMainStyles}
        >
          <DateAndCityName styles={{ color: dynamicStyles.color }} />
          <OneDayWeather styles={{ color: dynamicStyles.color }} />
          <SunPath styles={{ color: dynamicStyles.color }} />

          <View style={styles.showDetailsIcon}>
            <MaterialCommunityIcon
              name="chevron-double-down"
              size={45}
              color={this.state.fontColor}
              onPress={() =>
                this.props.navigation.navigate("Details", {
                  defaultStyles: combineMainStyles,
                  textColor: { color: dynamicStyles.color }
                })
              }
            />
          </View>
        </GestureRecognizer>
      );
    } else {
      return (
        <View style={combineLoadingStyles}>
          <AnimatedIcon
            name="weather-sunny"
            size={80}
            style={{ transform: [{ rotate: spin }] }}
            color={"#3C3C3B"}
          />
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
