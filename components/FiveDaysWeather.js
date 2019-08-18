import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { connect } from "react-redux";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import moment from "moment";

class FiveDaysWeather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fiveDayForecast: []
    };
  }

  setIcon = id => {
    if (id < 300) {
      return "weather-windy";
    } else if (id < 500) {
      return "weather-rainy";
    } else if (id < 600) {
      return "weather-pouring";
    } else if (id < 700) {
      return "weather-snowy";
    } else if (id < 800) {
      return "weather-cloudy";
    } else if (id == 800) {
      return "weather-sunny";
    } else {
      return "weather-cloudy";
    }
  };

  showWeatherForFiveDays = () => {
    const forecastHolder = [];
    const simplifiedForecast = [];
    this.props.fiveDaysWeatherInfo.list.map(el => {
      if (el.dt_txt.includes("12:00")) {
        forecastHolder.push(el);
      }
    });

    forecastHolder.forEach(day => {
      const oneDayInfo = {};
      const dayName = moment(day.dt_txt).format("dddd");
      const dayTemp = Math.round(day.main.temp);
      const dayIcon = day.weather[0].id;
      oneDayInfo.dayName = dayName;
      oneDayInfo.temperature = dayTemp;
      oneDayInfo.forecastIcon = dayIcon;
      simplifiedForecast.push(oneDayInfo);
    });
    this.setState({
      fiveDayForecast: simplifiedForecast
    });
  };

  componentDidMount() {
    this.showWeatherForFiveDays();
  }

  render() {
    const { fiveDayForecast } = this.state;
    return (
      <View>
        {fiveDayForecast.map(day => {
          const { dayName, temperature, forecastIcon } = day;
          return (
            <View key={fiveDayForecast.indexOf(day)}>
              <Text style={[this.props.styles]}>{dayName}</Text>
              <View>
                <MaterialCommunityIcon
                  name={this.setIcon(forecastIcon)}
                  size={30}
                  color={this.props.styles.color}
                />
                <Text style={[this.props.styles]}>{temperature}&#176;</Text>
              </View>
            </View>
          );
        })}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    fiveDaysWeatherInfo: state.fiveDayWeatherReducer.fiveDaysWeather
  };
};

export default connect(
  mapStateToProps,
  {}
)(FiveDaysWeather);
