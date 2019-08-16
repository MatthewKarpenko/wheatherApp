import React, { Component } from "react";
import { Text, View, StyleSheet, TextInput, Button } from "react-native";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { searchOneDayWeather} from "../redux/store";
import { connect } from "react-redux";

class StartScreen extends Component {
  constructor(props) {
    super(props);    
    this.state = {
      text: ''
    }
    this.input = React.createRef();
  }

  showWeather = () => {
    console.log(this.state.text)
    this.props.searchOneDayWeather(this.state.text);
    this.props.navigation.navigate("Home",{})
  };

  componentDidMount() {

  };
  
  render() {
    return (
      <View style={styles.background}>
        <MaterialCommunityIcon
          name="weather-cloudy"
          size={60}
          color={"white"}
        />
        <TextInput
        ref={this.input}
          style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
          onChangeText={(text) => this.setState({text})}
        
        />

        <Text> or </Text>

        <Button
          onPress={this.showWeather}
          title="Use your location"
          color="white"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#709EA8",
    flex: 1,
    justifyContent: "center",
    alignItems: 'center'
  }
});

const mapDispatchToProps = {
  searchOneDayWeather
};

export default connect(
  ()=>{return{}},
  mapDispatchToProps
)(StartScreen);
