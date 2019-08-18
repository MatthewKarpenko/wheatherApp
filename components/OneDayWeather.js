import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import FeatherIcon from "react-native-vector-icons/Feather";
import { connect } from "react-redux";


const night = 'night';

class OneDayWeather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      iconType: "weather-cloudy",
      todayTemp: null,
      maxMinTemp: [null, null],
      weatherType: ""
    };
  }

  setIcon = id => {
    console.log(this.props.partOfTheDay)
    if(this.props.partOfTheDay === night) {
      return (
        <FeatherIcon
        name={"moon"}
        size={80}
        color={this.props.screenColors.color}
      />
      )
    }else {
    if (id < 300) {
      return ( <MaterialCommunityIcon
        name={"weather-windy"}
        size={80}
        color={this.props.screenColors.color}
      />)
      
    } else if (id < 500) {
      return ( <MaterialCommunityIcon
        name={"weather-rainy"}
        size={80}
        color={this.props.screenColors.color}
      />)
      
    } else if (id < 600) {
      return ( <MaterialCommunityIcon
        name={"weather-pouring"}
        size={80}
        color={this.props.screenColors.color}
      />)
    
    } else if (id < 700) {
      return ( <MaterialCommunityIcon
        name={"weather-snowy"}
        size={80}
        color={this.props.screenColors.color}
      />)
      
    } else if (id < 800) {
      return ( <MaterialCommunityIcon
        name={"weather-cloudy"}
        size={80}
        color={this.props.screenColors.color}
      />)
     
    } else if (id === 800) {
      return ( <MaterialCommunityIcon
        name={ "weather-sunny"}
        size={80}
        color={this.props.screenColors.color}
      />)
    
    } else {
      return ( <MaterialCommunityIcon
        name={"weather-cloudy"}
        size={80}
        color={this.props.screenColors.color}
      />)
     
    }
  }
  };

  componentDidMount() {
    const { oneDayWeatherInfo, weatherId } = this.props;

    this.setIcon(weatherId);
    const temperatures = [];
    temperatures.unshift(Math.round(oneDayWeatherInfo.main.temp_min));
    temperatures.unshift(Math.round(oneDayWeatherInfo.main.temp_max));
    this.setState({
      todayTemp: Math.round(oneDayWeatherInfo.main.temp),
      maxMinTemp: temperatures,
      weatherType: oneDayWeatherInfo.weather[0].main.toLowerCase()
    });
  }

  render() {
    const { screenColors } = this.props
    return (
      <View style={styles.container}>
        {this.setIcon()}
        <View style={styles.todayTempContainer}>
          <Text style={[{color:screenColors.color}]}>{this.state.maxMinTemp[1]}&#176;</Text>

          <Text style={[{color:screenColors.color}, styles.currentTemp]}>{this.state.todayTemp}&#176;</Text>

          <Text style={[{color:screenColors.color}]}>{this.state.maxMinTemp[0]}&#176;</Text>
        </View>

        <Text style={[{color:screenColors.color}]}>{this.state.weatherType}</Text>
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

const mapStateToProps = state => {
  const { oneDayWeather } = state.oneDayWeatherReducer;
  return {
    oneDayWeatherInfo: oneDayWeather,
    weatherId: oneDayWeather.weather[0].id,
    screenColors: state.setColorReducer.colors,
    partOfTheDay: state.setColorReducer.partOfTheDay
  };
};

export default connect(
  mapStateToProps,
  {}
)(OneDayWeather);
