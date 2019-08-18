import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { connect } from "react-redux";

class CurrentDayDetails extends Component {
  render() {
    const { main, clouds, wind } = this.props.oneDayWeatherInfo;
    const { screenColors } = this.props;
    return (
      <View>
        <Text style={[{color: screenColors.color}]}>Details</Text>
        <View>
          <Text style={[{color: screenColors.color}]}>Clouds:{clouds.all} %</Text>
          <Text style={[{color: screenColors.color}]}>Humidity:{main.humidity} %</Text>
          <Text style={[{color: screenColors.color}]}>Pressure:{main.pressure} hPa</Text>
          <Text style={[{color: screenColors.color}]}>Wind:{wind.speed} m/s</Text>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  oneDayWeatherInfo: state.oneDayWeatherReducer.oneDayWeather,
  screenColors: state.setColorReducer.colors

});

export default connect(
  mapStateToProps,
  {}
)(CurrentDayDetails);
