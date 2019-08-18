import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { connect } from "react-redux";

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

  setIcon = id => {
    if (id < 300) {
      this.setState({
        iconType: "weather-windy"
      });
    } else if (id < 500) {
      this.setState({
        iconType: "weather-rainy"
      });
    } else if (id < 600) {
      this.setState({
        iconType: "weather-pouring"
      });
    } else if (id < 700) {
      this.setState({
        iconType: "weather-snowy"
      });
    } else if (id < 800) {
      this.setState({
        iconType: "weather-cloudy"
      });
    } else if (id === 800) {
      this.setState({
        iconType: "weather-sunny"
      });
    } else {
      this.setState({
        iconType: "weather-cloudy"
      });
    }
  };

  componentDidMount() {
    const { oneDayWeatherInfo, weatherId } = this.props;

    this.setIcon(weatherId);
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
    return (
      <View style={styles.container}>
        <MaterialCommunityIcon
          name={this.state.iconType}
          size={80}
          color={this.props.styles.color}
        />
        <View style={styles.todayTempContainer}>
          <Text style={[this.props.styles]}>{this.state.maxMinTemp[1]}&#176;</Text>

          <Text style={[this.props.styles, styles.currentTemp]}>{this.state.todayTemp}&#176;</Text>

          <Text style={[this.props.styles]}>{this.state.maxMinTemp[0]}&#176;</Text>
        </View>

        <Text style={[this.props.styles]}>{this.state.weatherType}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center"
  },

  todayTempContainer: {
    width: 100,
    display: "flex",
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
    paddingTop: 20,
    paddingBottom: 20,
    paddingRight: 30,
    paddingLeft: 30
  },

  currentTemp: {
    fontSize: 30,
    fontWeight: "200"
  }
});

const mapStateToProps = state => {
  const { oneDayWeather } = state.oneDayWeatherReducer;
  return {
    oneDayWeatherInfo: oneDayWeather,
    weatherId: oneDayWeather.weather[0].id
  };
};

export default connect(
  mapStateToProps,
  {}
)(OneDayWeather);
