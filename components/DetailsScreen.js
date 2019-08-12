import React, { Component } from 'react';
import { StyleSheet, View, PermissionsAndroid } from "react-native";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import GestureRecognizer from 'react-native-swipe-gestures';

export default class DetailsScreen extends Component {
    render() {
        const { navigation } = this.props;
        const defStyles = navigation.getParam("defaultStyles", {
            backgroundColor: "#FBC244",
            color: "#3C3C3B",
            margin: 0,
            flex: 1,  
            fontSize: 10,
        });
        const config = navigation.getParam('config', {
        
            velocityThreshold: 0.3,
            directionalOffsetThreshold: 80
          
        })

        return (
          <GestureRecognizer
          onSwipeDown={()=>this.props.navigation.goBack()}
          config={config}
          style={defStyles}
          >
       
            <View style={styles.showDetailsIcon}>
              <MaterialCommunityIcon
                name="chevron-double-up"
                size={45}
                color={"#3C3C3B"}
                onPress={() =>
                  this.props.navigation.goBack()
                }
              />
            </View>
       </GestureRecognizer>
          
        );
    }
}

const styles = StyleSheet.create({
  showDetailsIcon: {
    alignItems: "center"
  }
}); 