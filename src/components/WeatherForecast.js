import React from 'react';

function WeatherForecast({ data, unit }) {
  const date = new Date(data.dt * 1000).toLocaleDateString("en-US", {
    weekday: 'long',
    month: 'short',
    day: 'numeric'
  });
  const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  // Convert temperature based on unit
  const temp = unit === "metric" 
    ? Math.round(data.main.temp)
    : Math.round(data.main.temp * 9/5 + 32); // Celsius to Fahrenheit
  
  return (
    <div className="weather-forecast">
      <h3>{date}</h3>
      <img src={iconUrl} alt="weather icon" />
      <p>{data.weather[0].description}</p>
      <p>Temp: {temp}°{unit === "metric" ? "C" : "F"}</p>
      <p>Humidity: {data.main.humidity}%</p>
    </div>
  );
}

export default WeatherForecast;
