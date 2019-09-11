import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { connect } from "react-redux";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import moment from "moment";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

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
    const { screenColors } = this.props;
    const { oneDayContainer, tempAndIcon, textStyles, headerText, oneDayTemp } = styles;
    const combineTextStyles = StyleSheet.flatten([screenColors, textStyles]);
    return (
      <View>

        <Text style={[screenColors, headerText]}>Next days:</Text>

        {fiveDayForecast.map(day => {
          const { dayName, temperature, forecastIcon } = day;
          return (
            <View style={[oneDayContainer,
            { 
            borderTopColor: screenColors.color,
            borderTopWidth: 1
            }
            ]} 
            key={fiveDayForecast.indexOf(day)}>
              <Text style={combineTextStyles}>{dayName}</Text>
              <View style={ tempAndIcon }>
                <MaterialCommunityIcon
                  name={this.setIcon(forecastIcon)}
                  size={wp('10%')}
                  color={screenColors.color}
                />
                <Text style={[screenColors, oneDayTemp]}>{temperature}&#176;</Text>
              </View>
              
            </View>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  oneDayContainer : {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: wp("82%"),
    paddingTop: 5,
    paddingBottom: 5
  },
  tempAndIcon: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  textStyles: {
    fontSize: wp('4,9%'),
    fontFamily: 'Montserrat-Light'
  },
  headerText: {
    textAlign: 'center',
    fontFamily: "Montserrat-Medium",
    marginBottom: hp('1%'),
    marginTop: hp('2,5%'),
    fontSize: wp('5%')
  },
  oneDayTemp: {
    marginLeft: wp('3%'),
    fontSize: wp('5,8%')
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
