import React, { PureComponent } from "react";
import { createAppContainer, createStackNavigator } from "react-navigation";
import { Animated, Easing } from 'react-native';
import { Provider } from "react-redux";

import HomeScreen from "./HomeScreen";
import DetailsScreen from "./DetailsScreen";
import store from "../redux/store";
import StartScreen from './StartScreen'

let SlideFromBottom = (index, position, height) => {
  const translateY = position.interpolate({
    inputRange: [index - 1, index],
    outputRange: [height, 0],
  })

  return { transform: [ { translateY } ] }
};

const TransitionConfiguration = () => {
  return {
    transitionSpec: {
      duration: 650,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: (sceneProps) => {
      const { layout, position, scene } = sceneProps;
      const width = layout.initWidth;
      const height = layout.initHeight;
      const { index, route } = scene
      const params = route.params || {}; // <- That's new
      const transition = params.transition || 'default'; // <- That's new
      return {
        default: SlideFromBottom(index, position, height)
      }[transition];
    },
  }
}

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        header: null
      }
    },
    Details: {
      screen: DetailsScreen,
      navigationOptions: {
        header: null
      }
    },
    StartScreen: {
      screen: StartScreen,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    initialRouteName: "Home",
    transitionConfig: TransitionConfiguration
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends PureComponent {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}
