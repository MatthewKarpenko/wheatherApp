import { createStore, applyMiddleware } from "redux";
//import thunk for doing asynchronous operations in redux
import thunk from "redux-thunk";
//import reducer from our reducer file
import reducers from "./reducers/weatherInfo";
//import action creators used by dispatchers to alter your global state.
import { fetchData, fetchDataFulfilled, fetchDataRejected } from "./reducers/weatherInfo"
import axios from "axios";


const appId = "80ac52657b8f0fd478c3980320b78a32";
const units = "metric";

const getFiveDayWeather = (coords) => {
  return async dispatch => {
    //Dispatch the fetchData action creator before retrieving to set our loading state to true.
    dispatch(fetchData(true));
    //Then get the data.
     await axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${
             coords.latitude
           }&lon=${
             coords.longitude  
           }&units=${units}&APPID=${appId}`)
      .then(res => {
        //Set the results to the people array.
        dispatch(fetchDataFulfilled(res.data));
        //Error handle the promise and set your errorMessage
      })
      .catch(err => {
          dispatch(fetchDataRejected(err))
          console.log(err)});
      
  };
};


export const getOneDayWeather = (coords) => {
  return async dispatch => {
    //Dispatch the fetchData action creator before retrieving to set our loading state to true.
    dispatch(fetchData(true));
    //Then get the data.
     await axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${
             coords.latitude
           }&lon=${
             coords.longitude  
           }&units=${units}&APPID=${appId}`)
      .then(res => {
        //Set the results to the people array.
        dispatch(fetchDataFulfilled(res.data));
        //Error handle the promise and set your errorMessage
      })
      .catch(err => {
          dispatch(fetchDataRejected(err))
          console.log(err)});
      
  };
};



export default createStore(reducers, applyMiddleware(thunk));