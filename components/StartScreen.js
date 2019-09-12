import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  TextInput,
  PermissionsAndroid,
  TouchableOpacity,
  BackHandler 
} from "react-native";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import EvilIcon from "react-native-vector-icons/EvilIcons";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import {
  searchOneDayWeather,
  searchFiveDaysWeather,
  getOneDayWeather,
  getFiveDayWeather,
  setColorAccordingToWeather
} from "../redux/store";
import { connect } from "react-redux";
import GestureRecognizer from "react-native-swipe-gestures";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import Geolocation from "react-native-geolocation-service";

class StartScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      errorVisibility: false
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
            this.props.navigation.navigate("Home", {});
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

  showWeather = () => {
    if (this.state.text.length === 0) {
      this.setState({ errorVisibility: true });
      setTimeout(() => this.setState({ errorVisibility: false }), 3000);
    } else {
      this.props.searchOneDayWeather(this.state.text);
      this.props.searchFiveDaysWeather(this.state.text);
      this.props.navigation.navigate("Home", {});
    }
  };

  visibilityOfBackButton = () => {
    if (this.props.oneDayWeatherInfo == null) {
      return null
    }else {
      return(<MaterialIcon
        name="arrow-back"
        size={wp("9%")}
        color={"white"}
        style={styles.backButton}
        onPress={() => this.props.navigation.navigate("Home", {})}
      />)
    }
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  handleBackButtonClick = () => {
    if(this.props.oneDayWeatherInfo == null) {
      BackHandler.exitApp();
    }else {
    this.props.navigation.navigate('Home');
    }
    return true;
  }

  render() {
    const showErr = this.state.errorVisibility ? 1 : 0;
    const { screenColors, navigation } = this.props;
    const {
      background,
      textStyle,
      buttonStyles,
      textInputStyles
    } = styles;
    console.log(this.props.oneDayWeatherInfo)
    return (
      <GestureRecognizer
        style={background}
        onSwipeDown={() => navigation.goBack()}
      >
        {this.visibilityOfBackButton()}

        <MaterialCommunityIcon
          name="weather-cloudy"
          size={wp("30%")}
          color={"white"}
        />

        <TextInput
          style={textInputStyles}
          onChangeText={text => this.setState({ text })}
          placeholder="Search for a city"
          onSubmitEditing={this.showWeather}
          maxLength={85}
          placeholderTextColor="white"
        />

        <Text style={[textStyle, { fontFamily: "Montserrat-Bold" }]}> or </Text>

        <TouchableOpacity onPress={() => {
              this.getLocation();
            }} style={buttonStyles}>
          <Text
            
            style={[textStyle, { fontFamily: "Montserrat-Light" }]}
          >
            Use your location
          </Text>
          <EvilIcon name="location" size={wp("7%")} color={"white"} />
        </TouchableOpacity>
        <Text style={[screenColors, { opacity: showErr }]}>
          The field is empty *
        </Text>
      </GestureRecognizer>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#709EA8",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  textStyle: {
    fontSize: wp("5%"),
    color: "white"
  },
  buttonStyles: {
    display: "flex",
    flexDirection: "row",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "white",
    color: "white",
    textAlign: "center",
    overflow: "hidden",
    padding: 10,
    marginTop: wp("3%")
  },
  textInputStyles: {
    width: wp("52%"),
    fontSize: wp("5%"),
    fontFamily: "Montserrat-Light",
    borderBottomColor: "white",
    paddingBottom: 1,
    borderBottomWidth: 1,
    color: "white",
    marginBottom: wp("3%")
  },
  backButton: {
    position: "absolute",
    top: 5,
    left: 5
  }
});

const mapStateToProps = state => {
  const { oneDayWeather } = state.oneDayWeatherReducer;
  return {
    oneDayWeatherInfo: oneDayWeather,
    screenColors: state.setColorReducer.colors.text
  };
};

const mapDispatchToProps = {
  searchOneDayWeather,
  searchFiveDaysWeather,
  getOneDayWeather,
  getFiveDayWeather,
  setColorAccordingToWeather
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StartScreen);
