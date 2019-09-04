import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { connect } from "react-redux";

class CurrentDayDetails extends Component {
  render() {
    const { main, clouds, wind } = this.props.oneDayWeatherInfo;
    const { screenColors } = this.props;
    return (
      <View>
        <Text style={[screenColors]}>Details</Text>
        <View>
          <Text style={[screenColors]}>Clouds:{clouds.all} %</Text>
          <Text style={[screenColors]}>Humidity:{main.humidity} %</Text>
          <Text style={[screenColors]}>Pressure:{main.pressure} hPa</Text>
          <Text style={[screenColors]}>Wind:{wind.speed} m/s</Text>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  oneDayWeatherInfo: state.oneDayWeatherReducer.oneDayWeather,
  screenColors: state.setColorReducer.colors.text
});

export default connect(
  mapStateToProps,
  {}
)(CurrentDayDetails);
