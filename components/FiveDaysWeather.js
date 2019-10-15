import React, { PureComponent } from "react";
import { StyleSheet, View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { connect } from "react-redux";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import moment from "moment";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

import LoadingIcon from "./LoadingIcon";
import FiveDaysHoursWeather from "./FiveDaysHoursWeather";
import { setIcon } from "./reusableFunctions";

class FiveDaysWeather extends PureComponent {
  constructor() {
    super();
    this.state = {
      showWeatherByHours: false,
      forecastDate: ""
    };
  }

  showWeatherForFiveDays = arr => {
    const forecastHolder = [];
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
      const dayDate = moment(day.dt_txt).format("YYYY-MM-DD");
      oneDayInfo.dayName = dayName;
      oneDayInfo.temperature = dayTemp;
      oneDayInfo.forecastIcon = dayIcon;
      oneDayInfo.dayDate = dayDate;
      arr.push(oneDayInfo);
    });
  };

  handlerForShowingBackWeatherByDays = () => {
    console.log('lll')
    this.setState({
      showWeatherByHours: true
    })
  }

  render() {
    const { screenColors, fiveDaysWeatherInfo } = this.props;
    const {
      oneDayContainer,
      tempAndIcon,
      textStyles,
      headerText,
      oneDayTemp,
      oneDayTempIcon,
      allWeatherContainer
    } = styles;
    const combineTextStyles = StyleSheet.flatten([screenColors, textStyles]);
    const simplifiedForecast = [];
    if (fiveDaysWeatherInfo == null) {
      return (
        <View style={allWeatherContainer}>
          <LoadingIcon size={hp("15%")} />
        </View>
      );
    } else {
      if (!this.state.showWeatherByHours) {
        this.showWeatherForFiveDays(simplifiedForecast);

        return (
          <View>
            <Text style={[screenColors, headerText]}>Next days:</Text>
            {simplifiedForecast.map(day => {
              const { dayName, temperature, forecastIcon, dayDate } = day;
              return (
                <TouchableOpacity
                  style={[
                    oneDayContainer,
                    {
                      borderTopColor: screenColors.color,
                      borderTopWidth: 1
                    }
                  ]}
                  key={simplifiedForecast.indexOf(day)}
                  onPress={() => {
                    this.setState({
                      showWeatherByHours: true,
                      forecastDate: dayDate
                    });
                  }}
                >
                  <Text style={combineTextStyles}>{dayName}</Text>
                  <View style={tempAndIcon}>
                    <MaterialCommunityIcon
                      style={oneDayTempIcon}
                      name={setIcon(forecastIcon)}
                      size={wp("10%")}
                      color={screenColors.color}
                    />

                    <Text style={[screenColors, oneDayTemp]}>
                      {temperature}&#176;
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        );
      } else {
        return (
          <FiveDaysHoursWeather
            forecastDate={this.state.forecastDate}
            componentStyles={styles}
            handler={this.handlerForShowingBackWeatherByDays}
          />
        );
      }
    }
  }
}

const styles = StyleSheet.create({
  allWeatherContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: hp("7%")
  },
  oneDayContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: wp("82%"),
    paddingTop: 5,
    paddingBottom: 5
  },
  tempAndIcon: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  textStyles: {
    fontSize: wp("4,9%"),
    fontFamily: "Montserrat-Light"
  },
  headerText: {
    textAlign: "center",
    fontFamily: "Montserrat-Medium",
    marginBottom: hp("1%"),
    marginTop: hp("2,5%"),
    fontSize: wp("5%")
  },
  oneDayTemp: {
    width: 35,
    textAlign: "center",
    fontSize: wp("5,8%")
  },
  oneDayTempIcon: {
    width: 40
  }
});

const mapStateToProps = state => {
  return {
    fiveDaysWeatherInfo: state.fiveDayWeatherReducer.fiveDaysWeather,
    screenColors: state.setColorReducer.colors.text
  };
};

export default connect(
  mapStateToProps,
  {}
)(FiveDaysWeather);
