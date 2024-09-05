import React, { useState } from "react";
import { useWeatherStore } from "../hooks/useWeatherStore";

const WeatherToggle: React.FC = () => {
  const [showExtra, setShowExtra] = useState(false);
  const { weatherData } = useWeatherStore();

  if (!weatherData) return null;

  const { current } = weatherData;

  return (
    <div className="bg-white shadow-md rounded p-4 mb-4">
      <button
        onClick={() => setShowExtra(!showExtra)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        {showExtra ? "Hide" : "Show"} Extra Info
      </button>

      {showExtra && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p>Wind Speed: {current.wind_speed} m/s</p>
            <p>Humidity: {current.humidity}%</p>
          </div>
          <div>
            <p>Pressure: {current.pressure} hPa</p>
            
            <p>Visibility: {weatherData.current.visibility / 1000} km</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherToggle;
