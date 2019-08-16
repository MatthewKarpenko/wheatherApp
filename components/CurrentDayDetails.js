import React, { Component } from 'react';
import { StyleSheet, View, Text} from "react-native";
import { connect } from "react-redux";

 class CurrentDayDetails extends Component {
    render() {
        const { main, clouds, wind } = this.props.oneDayWeatherInfo

        return(
            <View>
                <Text>Details</Text>
                <View>
                    <Text>Clouds:{clouds.all} %</Text>
                    <Text>Humidity:{main.humidity} %</Text>
                    <Text>Pressure:{main.pressure}hPa</Text>
                    <Text>Wind:{wind.speed}m/s</Text>
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    oneDayWeatherInfo: state.oneDayWeatherReducer.oneDayWeather
  });
  
export default connect(
    mapStateToProps,
    {}
  )(CurrentDayDetails);