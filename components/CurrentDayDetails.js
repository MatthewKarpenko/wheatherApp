import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { connect } from "react-redux";

class CurrentDayDetails extends Component {
  render() {
    const { main, clouds, wind } = this.props.oneDayWeatherInfo;

    return (
      <View>
        <Text style={[this.props.styles]}>Details</Text>
        <View>
          <Text style={[this.props.styles]}>Clouds:{clouds.all} %</Text>
          <Text style={[this.props.styles]}>Humidity:{main.humidity} %</Text>
          <Text style={[this.props.styles]}>Pressure:{main.pressure} hPa</Text>
          <Text style={[this.props.styles]}>Wind:{wind.speed} m/s</Text>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  oneDayWeatherInfo: state.oneDayWeatherReducer.oneDayWeather
});

export default connect(
  mapStateToProps,
  {}
)(CurrentDayDetails);
