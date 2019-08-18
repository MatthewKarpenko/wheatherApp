import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";

class DateAndCityName extends Component {
  setDate() {
    const day = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ];
    const month = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    const fetchDate = new Date();
    let currentDay;

    function setDay() {
      if (day[fetchDate.getDay() - 1] === undefined) {
        currentDay = "Sunday";
      } else {
        currentDay = day[fetchDate.getDay() - 1];
      }
    }
    setDay();
    return `${currentDay}, ${fetchDate.getDate()} ${
      month[fetchDate.getMonth()]
    } ${fetchDate.getFullYear()}`;
  }

  render() {
    return (
      <View style={styles.mainHeader}>
        <Text style={[{color: this.props.screenColors.color}, styles.date]}>{this.setDate()}</Text>
        <Text style={[{color: this.props.screenColors.color}, styles.cityName]}>
          {this.props.city}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  date: {
    fontSize: 10,
    fontWeight: "400"
  },
  mainHeader: {
    alignSelf: "center",
    textAlign: "center",
    marginTop: 20
  },
  cityName: {
    fontSize: 30,
    fontWeight: "300",
    marginTop: 20
  }
});

const mapStateToProps = state => {
  const { oneDayWeather } = state.oneDayWeatherReducer;
  return {
    city: oneDayWeather.name,
    screenColors: state.setColorReducer.colors
  };
};

export default connect(
  mapStateToProps,
  {}
)(DateAndCityName);
