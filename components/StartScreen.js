import React, { Component } from "react";
import { Text, View, StyleSheet, TextInput, Button } from "react-native";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { searchOneDayWeather, searchFiveDaysWeather } from "../redux/store";
import { connect } from "react-redux";
import GestureRecognizer from "react-native-swipe-gestures";


class StartScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      errorVisibility: false
    };
  }

  showWeather = () => {
    if (this.state.text.length === 0) {
      this.setState({ errorVisibility: true });
      setTimeout(() => this.setState({ errorVisibility: false }), 3000);
    } else {
      this.props.searchOneDayWeather(this.state.text);
      this.props.searchFiveDaysWeather(this.state.text);
      this.props.navigation.navigate("Home", {});
    }
  };

  render() {
    const showErr = this.state.errorVisibility ? 1 : 0;
    const { screenColors } = this.props;
    
    return (
      <GestureRecognizer style={styles.background}
      onSwipeDown={() =>
      this.props.navigation.goBack()}
    >
          
        <MaterialCommunityIcon
          name="weather-cloudy"
          size={60}
          color={"white"}
        />
        <TextInput
          style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
          onChangeText={text => this.setState({ text })}
          onSubmitEditing={this.showWeather}
        />

        <Text style={screenColors}> or </Text>

        <Button
          title="Use your location"
          color="black"
        />
        <Text style={[screenColors, { opacity: showErr }]}>The field is empty *</Text>
      
      </GestureRecognizer>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#709EA8",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

const mapStateToProps = state => {
  const { oneDayWeather } = state.oneDayWeatherReducer;
  return {
    oneDayWeatherInfo: oneDayWeather,
    screenColors: state.setColorReducer.colors.text,
  };
};

const mapDispatchToProps = {
  searchOneDayWeather,
  searchFiveDaysWeather
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StartScreen);
