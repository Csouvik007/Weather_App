import React from 'react';
import { TbTemperaturePlus } from "react-icons/tb";
import { LiaTemperatureHighSolid } from "react-icons/lia";
import { WiHumidity } from "react-icons/wi";
import { LuWind } from "react-icons/lu";

function WeatherCard({ data, unit }) {
  const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  return (
    <div className="weather-card">
      <h3>{data.name}, {data.sys.country}</h3>
      <img src={iconUrl} alt="weather icon" />
      <p>{data.weather[0].description}</p>
      <p><TbTemperaturePlus/>Temperature: {Math.round(data.main.temp)}°{unit === "metric" ? "C" : "F"}</p>
      <p><LiaTemperatureHighSolid/>Feels like: {Math.round(data.main.feels_like)}°{unit === "metric" ? "C" : "F"}</p>
      <p><WiHumidity/>Humidity: {data.main.humidity}%</p>
      <p><LuWind/>Wind Speed: {data.wind.speed} {unit === "metric" ? "m/s" : "mph"}</p>
    </div>
  );
}

export default WeatherCard;
