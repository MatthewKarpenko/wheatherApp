import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

export default class DateAndCityName extends Component {
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
    return `${day[fetchDate.getDay() - 1]}, ${fetchDate.getDate()} ${
      month[fetchDate.getMonth()]
    } ${fetchDate.getFullYear()}`;
  }

  render() {
    return (
      <View>
        <View style={styles.mainHeader}>
          <Text style={styles.date}>{this.setDate()}</Text>
          <Text style={styles.cityName}>{this.props.cityName}</Text>
        </View>
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
