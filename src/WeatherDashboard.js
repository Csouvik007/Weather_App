import React, { useState, useEffect } from 'react';
import WeatherCard from './components/WeatherCard';
import WeatherForecast from './components/WeatherForecast';
import AQICard from './components/AQICard';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { BiLogoGmail } from "react-icons/bi";

function WeatherDashboard() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [aqiData, setAqiData] = useState(null);
  const [city, setCity] = useState('Kolkata');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [unit, setUnit] = useState("metric");
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const apiKey = '316595b423fc69e82bd8d584b4851e10';

  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === "metric" ? "imperial" : "metric"));
  };

  const toggleTheme = () => {
    setIsDarkTheme((prevTheme) => !prevTheme);
  };

  const fetchWeatherData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`
      );
      const data = await response.json();

      if (response.ok) {
        setWeatherData(data);
        setError(null);
        fetchAQIData(data.coord.lat, data.coord.lon);
      } else {
        setError(data.message);
        setWeatherData(null);
      }
    } catch (error) {
      setError("Unable to fetch weather data");
    }
    setIsLoading(false);
  };

  const fetchForecastData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${unit}`
      );
      const data = await response.json();

      if (response.ok) {
        const dailyData = data.list.filter(reading => reading.dt_txt.includes("12:00:00"));
        setForecastData(dailyData);
      } else {
        setError(data.message);
        setForecastData(null);
      }
    } catch (error) {
      setError("Unable to fetch forecast data");
    }
    setIsLoading(false);
  };

  const fetchAQIData = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`
      );
      const data = await response.json();

      if (response.ok) {
        setAqiData(data.list[0]);
      } else {
        setError(data.message);
        setAqiData(null);
      }
    } catch (error) {
      setError("Unable to fetch AQI data");
    }
  };

  useEffect(() => {
    fetchWeatherData();
    fetchForecastData();
  }, [city, unit]);

  const handleCityChange = (e) => {
    setCity(e.target.value);
    setWeatherData(null);
    setForecastData(null);
    setAqiData(null);
  };

  useEffect(() => {
    document.body.classList.toggle("dark-theme", isDarkTheme);
  }, [isDarkTheme]);

  return (
    <div className="weather-dashboard">
      <h1>Weather Dashboard</h1>
      <input
        type="text"
        value={city}
        onChange={handleCityChange}
        placeholder="Enter city name"
      />
      <button onClick={() => { 
        fetchWeatherData(); 
        fetchForecastData(); 
      }}>Get Weather</button>

      <button onClick={toggleUnit}>
        Switch to {unit === "metric" ? "Fahrenheit" : "Celsius"}
      </button>

      <button onClick={toggleTheme}>
        Switch to {isDarkTheme ? "Light Theme" : "Dark Theme"}
      </button>

      {isLoading ? <p>Loading...</p> : null}
      {error && <p className="error">{error}</p>}

      <div className="info-container">
        {weatherData && <WeatherCard data={weatherData} unit={unit} />}
        <br/>
        {aqiData && <AQICard data={aqiData} />}
      </div>

      {forecastData && (
        <div className="forecast-container">
          <h2>5-Day Forecast</h2>
          {forecastData.map((day, index) => (
            <WeatherForecast key={index} data={day} unit={unit} />
          ))}
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        <p>Created by Souvik Chatterjee</p>
        <div className="social-icons">
          <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="github-icon">
            <FaGithub size={24} />
          </a>
          <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className="linkedin-icon">
            <FaLinkedin size={24} />
          </a>
          <a href="mailto:your.email@gmail.com" target="_blank" rel="noopener noreferrer" className="gmail-icon">
            <BiLogoGmail size={24} />
          </a>
        </div>
      </footer>
    </div>
  );
}

export default WeatherDashboard;
