import React, { Component } from 'react';
import { StyleSheet, View, PermissionsAndroid } from "react-native";
import Geolocation from 'react-native-geolocation-service';


import DateAndCityName from "./DateAndCityName";
import { getCurrentWeather } from '../requests/weatherRequests';
import OneDayWeather from './OneDayWeather';
import SunPath from './SunPath';

export default class App extends Component {
constructor(props) {
  super(props);
  this.state = {
    oneDayWeather: null,
    cityName: '',
    weatherId: null
  }
}
  
  getLocation = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Cool Location Permission",
          message:
            "Cool Location App needs access to your location " +
            "so you can take awesome forecast.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
         Geolocation.getCurrentPosition(
           position => {
            //  this.setState({oneDayWeather: getCurrentWeather(position.coords)});
          
            getCurrentWeather(position.coords).then(res=>{
            console.log(res)
            this.setState({
              oneDayWeather: res,
              cityName: res.name,
              weatherId: res.weather[0].id
            });
          })
          
           },
           error => {
             console.log(error.code, error.message);
           },
           {
             enableHighAccuracy: true,
             timeout: 15000,
             maximumAge: 10000
           }
         );
        console.log("You can use location");
      } else {
        console.log("location permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  }

 componentDidMount () {
    this.getLocation();
    console.log(this.state.oneDayWeather)
  }


  render() {
    return (
      <View style={styles.body}>
        <DateAndCityName cityName={this.state.cityName} />
        <OneDayWeather id={this.state.weatherId} weatherInfo={this.state.oneDayWeather}/>
        <SunPath weatherInfo={this.state.oneDayWeather} />
      </View>
    );
  }
} 

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#FBC244',
    
    margin: 0,
    flex: 1,
    fontSize: 10,
    color: '#3C3C3B'
  }
})