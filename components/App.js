import React, { Component } from 'react';
import { 
    createAppContainer, 
    createStackNavigator, 
    StackActions, 
    NavigationActions } 
    from 'react-navigation';

import HomeScreen from './HomeScreen';
import DetailsScreen from './DetailsScreen';

// const transitionConfig = () => {
//   return {
//     transitionSpec: {
//       duration: 750,
//       easing: Easing.out(Easing.poly(4)),
//       timing: Animated.timing,
//       useNativeDriver: true
//     },
//     screenInterpolator: sceneProps => {
//       const { layout, position, scene } = sceneProps;

//       const thisSceneIndex = scene.index;
//       const width = layout.initWidth;

//       const translateY = position.interpolate({
//         inputRange: [thisSceneIndex - 1, thisSceneIndex],
//         outputRange: [width, 0]
//       });
//       return { transform: [{ translateY }] };
//     }
//   }
//   }

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
    }
  },
  {
    initialRouteName: "Home",
    // transitionConfig,
  }
);


const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
  render() {
    return (
      <AppContainer/>
    );
  }
}