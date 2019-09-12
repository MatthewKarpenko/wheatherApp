import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen";

class ErrorScreen extends Component {
  render() {
    const { screenColors, errorCheck, navigation } = this.props;
    const { errorText, errorCode } = styles;
    return (
      <View
        style={[
          styles.errorContainer,
          { backgroundColor: screenColors.backgroundColor }
        ]}
      >
        <MaterialCommunityIcon
          name="weather-pouring"
          size={hp("15%")}
          color={screenColors.color}
        />
        <Text style={[screenColors.text, errorCode]}>{errorCheck.code}</Text>
        <Text style={[screenColors.text, errorText]}>{errorCheck.text}</Text>
        <AntDesignIcon
          name="back"
          size={hp("8%")}
          color={screenColors.color}
          onPress={() => navigation.navigate("StartScreen")}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  errorText: {
    fontSize: wp("5%"),
    textAlign: "center",
    marginTop: hp("1%"),
    marginBottom: hp("2%")
  },
  errorCode: {
    fontSize: wp("9%"),
    marginTop: hp("2%"),
    fontFamily: "Montserrat-Medium"
  }
});

const mapStateToProps = state => {
  return {
    screenColors: state.setColorReducer.colors,
    errorCheck: state.setErrorReducer
  };
};

export default connect(
  mapStateToProps,
  {}
)(ErrorScreen);
