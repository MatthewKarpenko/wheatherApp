import React, { PureComponent } from "react";
import { createAppContainer, createStackNavigator } from "react-navigation";
import { Provider } from "react-redux";
import { FluidNavigator } from "react-navigation-fluid-transitions";

import HomeScreen from "./HomeScreen";
import DetailsScreen from "./DetailsScreen";
import store from "../redux/store";

const AppNavigator = FluidNavigator(
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
    initialRouteName: "Home"
    // transitionConfig,
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
