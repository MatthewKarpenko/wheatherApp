import React, { Component } from "react";
//import React
import { StyleSheet, View } from "react-native";
//import all the basic components
import ZocialIcon from "react-native-vector-icons/Zocial";
import OcticonIcon from "react-native-vector-icons/Octicons";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicon from "react-native-vector-icons/Ionicons";
import FoundationIcon from "react-native-vector-icons/Foundation";
import EvilIcon from "react-native-vector-icons/EvilIcons";
import EntypoIcon from "react-native-vector-icons/Entypo";
import FAIcon from "react-native-vector-icons/FontAwesome";
import SimpleLineIcon from "react-native-vector-icons/SimpleLineIcons";
import FeatherIcon from "react-native-vector-icons/Feather";
import FontistoIcon from "react-native-vector-icons/Fontisto";
import AntIcon from "react-native-vector-icons/AntDesign";
 
//import vector icons


export default class OneDayWeather extends Component {
                 constructor(props) {
                   super(props);
                   this.state = {
                     iconType: ''
                   };
                 }
                 // set icon for each weather condition
                 setIcon = (id) => {
                   if (id < 300) {
                     this.setState({
                       iconType: "weather-windy"
                     });
                   } else if (id < 500) {
                       this.setState({
                         iconType: "weather-rainy"
                       });
                   
                   } else if (id < 600) {
                       this.setState({
                         iconType: "weather-pouring"
                       });
                    
                   } else if (id < 700) {
                        this.setState({
                          iconType: "weather-snowy"
                        });
                      
                   } else if (id < 800) {
                       this.setState({
                         iconType: "weather-cloudy"
                       });
                     
                   } else if (id === 800) {
                        this.setState({
                          iconType: "weather-sunny"
                        });
                       
                   } else {
                     this.setState({
                       iconType: "weather-cloudy"
                     });
                   }
                 }

                 componentDidMount() {
                    this.setIcon(this.props.id)
                 }

                 render() {
                   return (
                     <View style={styles.container}>
                       <MaterialCommunityIcon
                         name={this.state.iconType}
                         size={80}
                         color={'black'}
                       />
                     </View>
                   );
                 }
               }

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  }
});     