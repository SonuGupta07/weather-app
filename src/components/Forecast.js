import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactAnimatedWeather from "react-animated-weather";

function Forecast({ weather }) {
  const { data } = weather;
  const [forecastData, setForecastData] = useState([]);
  const [isCelsius, setIsCelsius] = useState(true); // Track temperature unit
  // console.log(data.current.condition.text)
  useEffect(() => {
    const fetchForecastData = async () => {
      const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
      const url = `https://api.weatherapi.com/v1/forecast.json?q=${data.location.name}&key=${apiKey}`
      try {
        const response = await axios.get(url);
        console.log(response);
        setForecastData(response.data.daily);
      } catch (error) {
        console.error("Error fetching forecast data:", error);
      }
    };

    fetchForecastData();
  }, [data.location.name]);

  const formatDay = (dateString) => {
    const options = { weekday: "short" };
    const date = new Date(dateString * 1000);
    return date.toLocaleDateString("en-US", options);
  };

  const getCurrentDate = () => {
    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    const currentDate = new Date().toLocaleDateString("en-US", options);
    return currentDate;
  };

  return (
    <div>
      <div className="city-name">
        <h2>
          {data.location.name}, <span>{data.location.country}</span>
        </h2>
      </div>
      <div className="date">
        <span>{getCurrentDate()}</span>
      </div>
      <div className="temp">
        {data &&data.current && data.current.condition.icon && (
          <img
            src={data.current.condition.icon}
            alt={data.current.condition.text}
            className="temp-icon"
          />
        )}
        {data.current.temp_c}
        <sup className="temp-deg">°C</sup>
      </div>
      <p className="weather-des">{data.current.condition.text}</p>
      <div className="weather-info">
        <div className="col">
          <ReactAnimatedWeather icon="WIND" size="40" />
          <div>
            <p className="wind">{data.current.wind_kph} m/s</p>
            <p>Wind speed</p>
          </div>
        </div>
        <div className="col">
          <ReactAnimatedWeather icon="RAIN" size="40" />
          <div>
            <p className="humidity">{data.current.humidity}%</p>
            <p>Humidity</p>
          </div>
        </div>
      </div>
      {/* <div className="forecast">
        <h3>5-Day Forecast:</h3>
        <div className="forecast-container">
          {forecastData &&
            forecastData.slice(0, 5).map((day) => (
              <div className="day" key={day.time}>
                <p className="day-name">{formatDay(day.time)}</p>
                {day.condition.icon_url && (
                  <img
                    className="day-icon"
                    src={day.condition.icon_url}
                    alt={day.condition.description}
                  />
                )}
                <p className="day-temperature">
                  {Math.round(day.temperature.minimum)}° /{" "}
                  <span>{Math.round(day.temperature.maximum)}°</span>
                </p>
              </div>
            ))}
        </div>
      </div> */}
    </div>
  );
}

export default Forecast;
