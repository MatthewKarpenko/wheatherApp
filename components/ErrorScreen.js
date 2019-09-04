import React, { Component } from "react";
import { Text, StyleSheet } from "react-native";
import { connect } from "react-redux";
import GestureRecognizer from "react-native-swipe-gestures";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";


class ErrorScreen extends Component {
  render() {
      const { screenColors, errorCheck } = this.props;
    return (
      <GestureRecognizer style={[styles.errorContainer,{backgroundColor:screenColors.backgroundColor}]}
        onSwipeUp={() =>
        this.props.navigation.goBack('StartScreen')}
      >
        <MaterialCommunityIcon
              name="emoticon-sad-outline"
              size={45}
              color={screenColors.color}
            />
        <Text>{errorCheck.code}</Text>
        <Text>{errorCheck.text}</Text>
      </GestureRecognizer>
    );
  }
}

const styles = StyleSheet.create({
    errorContainer: {
        flex: 1, 
        justifyContent: "center", 
        alignItems: "center" 
    }
})

const mapStateToProps = state => {
    return {
      screenColors: state.setColorReducer.colors.text,
      errorCheck: state.setErrorReducer
    };
  };
  
  
  
  export default connect(
    mapStateToProps,
    {}
  )(ErrorScreen);
