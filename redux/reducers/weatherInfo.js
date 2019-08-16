
import { combineReducers } from 'redux'


//Define initialState
const weatherStateForOneDay = {
  oneDayWeather: {},
  loading: true,
  errorMessage: ""
};

const GET_WEATHER_ONE_DAY = "GET_WEATHER_ONE_DAY";
const GET_WEATHER_ONE_DAY_FULFILLED = "GET_WEATHER_ONE_DAY_FULFILLED";
const GET_WEATHER_ONE_DAY_REJECTED = "GET_WEATHER_ONE_DAY_REJECTED";

const oneDayWeatherReducer = (state = weatherStateForOneDay, action) => {
  switch (action.type) {
    case GET_WEATHER_ONE_DAY:
      return { ...state, loading: action.payload };
    case GET_WEATHER_ONE_DAY_FULFILLED:
      return { ...state, oneDayWeather: action.payload, loading: action.loading };
    case GET_WEATHER_ONE_DAY_REJECTED:
      return {
        ...state,
        errorMessage: action.payload,
        loading: action.loading
      };
    default:
      return state;
  }
};


const weatherStateForFiveDays = {
  fiveDaysWeather: {},
  loading: true,
  errorMessage: ""
};

const GET_WEATHER_FIVE_DAYS = "GET_WEATHER_FIVE_DAYS";
const GET_WEATHER_FIVE_DAYS_FULFILLED = "GET_WEATHER_FIVE_DAYS_FULFILLED";
const GET_WEATHER_FIVE_DAYS_REJECTED = "GET_WEATHER_FIVE_DAYS_REJECTED";

const fiveDayWeatherReducer = (state = weatherStateForFiveDays, action) => {
  switch (action.type) {
    case GET_WEATHER_FIVE_DAYS:
      return { ...state, loading: action.payload };
    case GET_WEATHER_FIVE_DAYS_FULFILLED:
      return { ...state, fiveDaysWeather: action.payload, loading: action.loading };
    case GET_WEATHER_FIVE_DAYS_REJECTED:
      return {
        ...state,
        errorMessage: action.payload,
        loading: action.loading
      };
    default:
      return state;
  }
};



     
export default combineReducers({oneDayWeatherReducer,fiveDayWeatherReducer});

