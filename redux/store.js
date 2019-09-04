import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import reducers from "./reducers/weatherInfo";
import moment from "moment";

import {
  fetchData,
  fetchDataFulfilled,
  fetchDataRejected,
  setColors,
  setError
} from "./actions/weatherActions";
import axios from "axios";

const appId = "80ac52657b8f0fd478c3980320b78a32";
const units = "metric";
const day = 'day';
const night = 'night'

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
        dispatch(sendError(err.response.status));
        dispatch(fetchDataRejected(err,"GET_WEATHER_FIVE_DAYS_REJECTED"))
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
        dispatch(sendError(err.response.status));
        dispatch(fetchDataRejected(err,"GET_WEATHER_ONE_DAY_REJECTED"))
      });
  };
};

export const searchOneDayWeather = cityName => {
  return async dispatch => {
    dispatch(fetchData(true, "GET_WEATHER_ONE_DAY"));
    await axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${units}&APPID=${appId}`
      )
      .then(res => {
        dispatch(fetchDataFulfilled(res.data, "GET_WEATHER_ONE_DAY_FULFILLED"));
        dispatch(setColorAccordingToWeather(res.data.sys.sunrise,res.data.sys.sunset))
      })
      .catch(err => {
        dispatch(sendError(err.response.status));
        dispatch(fetchDataRejected(err,"GET_WEATHER_ONE_DAY_REJECTED"))
      });
  };
};

export const searchFiveDaysWeather = cityName => {
  return async dispatch => {
    dispatch(fetchData(true, "GET_WEATHER_ONE_DAY"));
    await axios
      .get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=${units}&APPID=${appId}`
      )
      .then(res => {
        dispatch(
          fetchDataFulfilled(res.data, "GET_WEATHER_FIVE_DAYS_FULFILLED")
        );
      })
      .catch(err => {
        dispatch(sendError(err.response.status));
        dispatch(fetchDataRejected(err,"GET_WEATHER_FIVE_DAYS_REJECTED"))
      });
  };
};

export const setColorAccordingToWeather = (sunrise, sunset) => {
  return dispatch => {
    let currentTimeUnix = moment().unix();
    if (currentTimeUnix >= sunrise && currentTimeUnix < sunset) {
      dispatch(
        setColors("SET_COLOR_ACCORDING_TO_TIME",{
          backgroundColor: '#FBC244',
          text: {
            color: '#3C3C3B',
            fontFamily: 'Montserrat-Regular',
          } }, day)
      );
      
    } else {
      dispatch(
        setColors("SET_COLOR_ACCORDING_TO_TIME", {
          backgroundColor: "#3C3C3B",
          text: {
            color: "#FFF",
            fontFamily: 'Montserrat-Regular',
          }
        },night)
      );
      
    }
  }
  
};

export const sendError = (code) => {
  return dispatch => {
    if(code == 404 || code == 400) {
      dispatch(setError('TYPE_OF_ERROR',{code, text:'Sorry, we can`t find this city in our database'}, true))
    }else if(code == 500 || code == 502 || code == 503){
      dispatch(setError('TYPE_OF_ERROR',{code, text:'Sorry, we have some server problems'}, true))
    }else {
      dispatch(setError('TYPE_OF_ERROR',{code, text:'Sorry, something went wrong'}, true))
    }
  }
}

export default createStore(reducers, applyMiddleware(thunk, logger));
