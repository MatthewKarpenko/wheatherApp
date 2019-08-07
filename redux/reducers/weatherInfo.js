//Define initialState
const weatherStateForOneDay = {
  //Have a people array responsible for getting the data and setting to the array.
  oneDayWeather: {},
  //Have the loading state indicate if it's done getting data.
  loading: true,
  //Have state for error message for recieving an error.
  errorMessage: ""
};

//Define action types
//Initiate the api call
const GET_WEATHER_ONE_DAY = "GET_WEATHER_ONE_DAY";
//Gets the weather on api call is fullfilled
const GET_WEATHER_ONE_DAY_FULFILLED = "GET_WEATHER_ONE_DAY_FULFILLED";
//When there is a error return an errror action type.
const GET_WEATHER_ONE_DAY_REJECTED = "GET_WEATHER_ONE_DAY_REJECTED";

//Define your reducer that will return the initialState by default
const oneDayWeatherReducer = (state = initialState, action) => {
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

export default oneDayWeatherReducer;
