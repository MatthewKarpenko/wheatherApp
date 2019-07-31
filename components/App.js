import React, { Component } from 'react';
import { StyleSheet, View, Button, PermissionsAndroid, Text } from "react-native";
import Geolocation from 'react-native-geolocation-service';
import DateAndCityName from "./DateAndCityName";
import { getCurrentWeather } from '../requests/weatherRequests';
import OneDayWeather from './OneDayWeather';

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
             // See error code charts below.
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
  }


  render() {
    return (
      <View style={styles.body}>
        <DateAndCityName cityName={this.state.cityName} />
        <OneDayWeather id={this.state.weatherId}/>
      </View>
    );
  }
} 

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#FBC244',
    flex: 1
  }
})