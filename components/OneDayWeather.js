import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";


//import vector icons

export default class OneDayWeather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      iconType: "weather-cloudy",
      todayTemp: null,
      maxMinTemp: [null, null],
      weatherType: ""
    };
  }
  // set icon for each weather condition
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

  componentWillReceiveProps(nextProps) {
    if (this.props.weatherInfo != nextProps.weatherInfo) {
     
      this.setIcon(nextProps.id);
      const temperatures = [];
      temperatures.unshift(Math.round(nextProps.weatherInfo.main.temp_min));
      temperatures.unshift(Math.round(nextProps.weatherInfo.main.temp_max));
      this.setState({
        todayTemp: Math.round(nextProps.weatherInfo.main.temp),
        maxMinTemp: temperatures,
        weatherType: nextProps.weatherInfo.weather[0].main.toLowerCase()
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <MaterialCommunityIcon
          name={this.state.iconType}
          size={80}
          color={"#3C3C3B"}
        />
        <View style={styles.todayTempContainer}>
          <Text>{this.state.maxMinTemp[0]}&#176;</Text>

          <Text style={styles.currentTemp}>{this.state.todayTemp}&#176;</Text>

          <Text>{this.state.maxMinTemp[1]}&#176;</Text>
        </View>

        <Text>{this.state.weatherType}</Text>
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
