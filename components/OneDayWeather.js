import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { connect } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

const night = "night";

class OneDayWeather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      iconType: "weather-cloudy",
      todayTemp: null,
      maxMinTemp: [null, null],
      weatherType: ""
    };
  }

  setIcon = (id, iconColor = "#3C3C3B") => {
    if (this.props.partOfTheDay === night) {
      return (
        <MaterialCommunityIcon
          name={"weather-night"}
          size={110}
          color={iconColor}
        />
      );
    } else {
      if (id < 300) {
        return (
          <MaterialCommunityIcon
            name={"weather-windy"}
            size={110}
            color={iconColor}
          />
        );
      } else if (id < 500) {
        return (
          <MaterialCommunityIcon
            name={"weather-rainy"}
            size={110}
            color={iconColor}
          />
        );
      } else if (id < 600) {
        return (
          <MaterialCommunityIcon
            name={"weather-pouring"}
            size={110}
            color={iconColor}
          />
        );
      } else if (id < 700) {
        return (
          <MaterialCommunityIcon
            name={"weather-snowy"}
            size={110}
            color={iconColor}
          />
        );
      } else if (id < 800) {
        return (
          <MaterialCommunityIcon
            name={"weather-cloudy"}
            size={110}
            color={iconColor}
          />
        );
      } else if (id === 800) {
        return (
          <MaterialCommunityIcon
            name={"weather-sunny"}
            size={110}
            color={iconColor}
          />
        );
      } else {
        return (
          <MaterialCommunityIcon
            name={"weather-cloudy"}
            size={110}
            color={iconColor}
          />
        );
      }
    }
  };

  componentDidMount() {
    const { oneDayWeatherInfo } = this.props;

    const temperatures = [];
    temperatures.unshift(Math.round(oneDayWeatherInfo.main.temp_min));
    temperatures.unshift(Math.round(oneDayWeatherInfo.main.temp_max));
    this.setState({
      todayTemp: Math.round(oneDayWeatherInfo.main.temp),
      maxMinTemp: temperatures,
      weatherType: oneDayWeatherInfo.weather[0].main.toLowerCase()
    });
  }

  render() {
    const { screenColors, weatherId } = this.props;
    const {
      partTempStyles,
      tempStyles,
      currentTemp,
      container,
      todayTempContainer,
      weatherName
    } = styles;
    return (
      <View style={{ marginTop: hp("2%") }}>
        <View style={container}>{this.setIcon(weatherId, screenColors.color)}</View>
        <View style={todayTempContainer}>
          <View style={tempStyles}>
            <MaterialCommunityIcon
              name={"arrow-down"}
              size={10}
              color={screenColors.color}
            />
            <Text style={[screenColors, partTempStyles]}>
              {this.state.maxMinTemp[1]}&#176;
            </Text>
          </View>
        <View>
          <Text style={[screenColors, currentTemp]}>
            {this.state.todayTemp}&#176;
          </Text>
        </View>
          <View style={tempStyles}>
            <MaterialCommunityIcon
              name={"arrow-up"}
              size={10}
              color={screenColors.color}
            />
            <Text style={[screenColors, partTempStyles]}>
              {this.state.maxMinTemp[0]}&#176;
            </Text>
          </View>
        </View>

        <Text style={[screenColors, weatherName]}>
          {this.state.weatherType}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center"
  },
  todayTempContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: "space-around",
    marginTop: wp("3%")
  },
  currentTemp: {
    fontSize: wp("18%"),
    fontFamily: "Montserrat-Light"
  },
  tempStyles: {
    display: "flex",
    flexDirection: "row",
    alignItems: 'center'
  },
  partTempStyles: {
    textAlign: "center",
    fontSize: wp("4%"),
  },
  weatherName: {
    marginTop: hp('3%'),
    textAlign: 'center',
    marginBottom: hp('-2.7%'),
    fontSize: wp('5%'),
    fontFamily: 'Montserrat-Regular'
  }
});

const mapStateToProps = state => {
  const { oneDayWeather } = state.oneDayWeatherReducer;
  return {
    oneDayWeatherInfo: oneDayWeather,
    weatherId: oneDayWeather.weather[0].id,
    screenColors: state.setColorReducer.colors.text,
    partOfTheDay: state.setColorReducer.partOfTheDay
  };
};

export default connect(
  mapStateToProps,
  {}
)(OneDayWeather);
