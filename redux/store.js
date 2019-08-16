import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from 'redux-logger';
import reducers from "./reducers/weatherInfo";

import {
  fetchData,
  fetchDataFulfilled,
  fetchDataRejected
} from "./actions/weatherActions";
import axios from "axios";

const appId = "80ac52657b8f0fd478c3980320b78a32";
const units = "metric";

export const getFiveDayWeather = coords => {
  return async dispatch => {
    dispatch(fetchData(true, "GET_WEATHER_FIVE_DAYS"));
    await axios
      .get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${
          coords.latitude
        }&lon=${coords.longitude}&units=${units}&APPID=${appId}`
      )
      .then(res => {
        dispatch(
          fetchDataFulfilled(res.data, "GET_WEATHER_FIVE_DAYS_FULFILLED")
        );
      })
      .catch(err => {
        dispatch(fetchDataRejected(err, "GET_WEATHER_FIVE_DAYS_REJECTED"));
        console.log(err);
      });
  };
};

export const getOneDayWeather = coords => {
  return async dispatch => {
    dispatch(fetchData(true, "GET_WEATHER_ONE_DAY"));
    await axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${
          coords.latitude
        }&lon=${coords.longitude}&units=${units}&APPID=${appId}`
      )
      .then(res => {
        dispatch(fetchDataFulfilled(res.data, "GET_WEATHER_ONE_DAY_FULFILLED"));

      })
      .catch(err => {
        dispatch(fetchDataRejected(err, "GET_WEATHER_ONE_DAY_REJECTED"));
        console.log(err);
      });
  };
};

export const searchOneDayWeather = cityName => {
  return async dispatch => {
    dispatch(fetchData(true, "GET_WEATHER_ONE_DAY"));
    await axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=London
      &units=${units}
      &APPID=${appId}`
      )
      .then(res => {
        console.log(res)
        dispatch(fetchDataFulfilled(res.data, "GET_WEATHER_ONE_DAY_FULFILLED"));
      })
      .catch(err => {
        dispatch(fetchDataRejected(err, "GET_WEATHER_ONE_DAY_REJECTED"));
        console.log(err);
      });
  };
};

export default createStore(reducers, applyMiddleware(thunk));
