import axios from 'axios';

const appId = "80ac52657b8f0fd478c3980320b78a32";
const units = "metric";

export async function getCurrentWeather(coords)  {
let res 
  await axios
         .get(
           `https://api.openweathermap.org/data/2.5/weather?lat=${
             coords.latitude
           }&lon=${
             coords.longitude  
           }&units=${units}&APPID=${appId}`
         )
         .then(function(response) {
           res = response.data
         })
         .catch(function(error) {
           // handle error
           console.log(error);
         })
         .finally(function() {
           // always executed
         })
         
         return res
}
