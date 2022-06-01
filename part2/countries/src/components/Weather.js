import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const Weather = ({ country }) => {
  const latlon = country.capitalInfo.latlng;
  const api_key = process.env.REACT_APP_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latlon[0]}&lon=${latlon[1]}&appid=${api_key}&units=metric`;
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    axios.get(url).then((response) => setWeather(response.data));
  }, []);

  /* The weather && <></>  make sure not to display the weather (null) while the promise hasnt been satisfied */
  return (
    weather && (
      <>
        <table>
          <thead>
            <tr>
              <th>Weather in {country.capital[0]}</th>
              <th>
                <img
                  src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt="weather_icon"
                />
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Temperature</th>
              <td>{weather.main.temp} C</td>
            </tr>
            <tr>
              <th>Min</th>
              <td>{weather.main.temp_min} C</td>
            </tr>
            <tr>
              <th>Max</th>
              <td>{weather.main.temp_max} C</td>
            </tr>
            <tr>
              <th>Wind</th>
              <td>
                {weather.wind.speed} km/h {weather.wind.deg} deg
              </td>
            </tr>
            <tr>
              <th>Humidity</th>
              <td>{weather.main.humidity} %</td>
            </tr>
          </tbody>
        </table>
      </>
    )
  );
};

export default Weather;
