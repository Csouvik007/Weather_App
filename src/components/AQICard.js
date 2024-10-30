import React from 'react';

function AQICard({ data }) {
  const aqiLevels = ["Good", "Fair", "Moderate", "Poor", "Very Poor"];
  const colors = ["#2ecc71", "#f1c40f", "#e67e22", "#e74c3c", "#8e44ad"];
  const aqiIndex = data.main.aqi;
  const aqiColor = colors[aqiIndex - 1];

  return (
    <div className="aqi-card" style={{ backgroundColor: aqiColor }}>
      <h3>Air Quality Index (AQI)</h3>
      <p>AQI Level: {aqiLevels[aqiIndex - 1]} ({aqiIndex})</p>
      <p>PM2.5: {data.components.pm2_5} µg/m³</p>
      <p>PM10: {data.components.pm10} µg/m³</p>
      <p>CO: {data.components.co} µg/m³</p>
      <p>NO₂: {data.components.no2} µg/m³</p>
      <p>SO₂: {data.components.so2} µg/m³</p>
    </div>
  );
}

export default AQICard;
