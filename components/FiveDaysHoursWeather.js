import React, { Component } from "react";
import { Text, View, ScrollView, StyleSheet } from "react-native";
import { connect } from "react-redux";
import moment from "moment";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";

import { setIcon } from "./reusableFunctions";

export class FiveDaysHoursWeather extends Component {
  constructor() {
    super();
    this.state = {
      weatherByHoursArray: []
    };
  }

  showForecastByHours = forecastDay => {
    const weatherHours = [];

    this.props.fiveDaysWeatherInfo.list.forEach(el => {
      if (el.dt_txt.includes(forecastDay)) {
        const oneDayHoursInfo = {};
        oneDayHoursInfo.hourName = moment(el.dt_txt).format("HH:mm");
        oneDayHoursInfo.hourTemp = Math.round(el.main.temp);
        oneDayHoursInfo.hourIcon = el.weather[0].id;
        weatherHours.push(oneDayHoursInfo);
      }
    });
    this.setState({
      weatherByHoursArray: weatherHours
    });
  };

  componentDidMount() {
    this.showForecastByHours(this.props.forecastDate);
  }

  render() {
    const { screenColors, forecastDate } = this.props;
    const {
      oneDayContainer,
      tempAndIcon,
      textStyles,
      oneDayTempIcon,
      oneDayTemp,
      headerText
    } = this.props.componentStyles;
    const dayName = moment(forecastDate).format("dddd");

    return (
      <View style={styles.hoursHolder}>
        <View >
                <MaterialCommunityIcon
                    style={styles.showDaysButton}
                    name={'calendar-month-outline'}
                    size={wp("8%")}
                    color={screenColors.color}
                    onPress={() => this.props.handler()}
                  />
        <Text
          style={[
            screenColors,
            headerText,
            {
              borderBottomColor: screenColors.color,
              borderBottomWidth: 1,
              width: wp("82%"),
              paddingBottom: 5
            }
          ]}
        >
          {dayName}:
        </Text>
        </View>
        <ScrollView scrollEnabled={true} showsVerticalScrollIndicator={false}>
          {this.state.weatherByHoursArray.map(h => {
            let blockStyles = [
              oneDayContainer,
              {
                borderTopColor: screenColors.color,
                borderTopWidth: 1,
              }
            ];
            if (this.state.weatherByHoursArray.indexOf(h) === 0) {
              blockStyles = oneDayContainer;
            }
            return (
              <View
                style={blockStyles}
                key={this.state.weatherByHoursArray.indexOf(h)}
              >
                <Text style={[textStyles, screenColors]}>{h.hourName}</Text>
                <View style={tempAndIcon}>
                  <MaterialCommunityIcon
                    style={oneDayTempIcon}
                    name={setIcon(h.hourIcon)}
                    size={wp("10%")}
                    color={screenColors.color}
                  />
                  <Text style={[screenColors, oneDayTemp]}>
                    {h.hourTemp}&#176;
                  </Text>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    fiveDaysWeatherInfo: state.fiveDayWeatherReducer.fiveDaysWeather,
    screenColors: state.setColorReducer.colors.text
  };
};

export default connect(
  mapStateToProps,
  {}
)(FiveDaysHoursWeather);

const styles = StyleSheet.create({
  hoursHolder: {
    height: hp("44%"),
    width: wp("100%"),
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  showDaysButton: {
    position: 'absolute',
    left: 0,
    top: 7
  }
});
