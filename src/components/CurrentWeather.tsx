import React, { useState } from "react";
import { CurrentWeather as CurrentWeatherType } from "../types/weather";

interface CurrentWeatherProps {
  weather: CurrentWeatherType;
  location: string;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ weather, location }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="bg-white shadow-md rounded p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4">{location}</h2>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <img
            src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`}
            alt={weather.description}
            className="w-16 h-16 mr-4"
          />
          <div>
            <p className="text-4xl">{Math.round(weather.temp)}°C</p>
            <p className="text-gray-600 capitalize">{weather.description}</p>
          </div>
        </div>
        <div>
          <p className="font-bold">High: {Math.round(weather.temp_max)}°C</p>
          <p className="font-bold">Low: {Math.round(weather.temp_min)}°C</p>
        </div>
      </div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        onClick={() => setShowDetails(!showDetails)}
      >
        {showDetails ? "Hide Details" : "Show Details"}
      </button>
      {showDetails && (
        <div className="mt-4 grid grid-cols-2 gap-4">
          <p>Wind Speed: {weather.wind_speed} m/s</p>
          <p>Humidity: {weather.humidity}%</p>
          <p>Pressure: {weather.pressure} hPa</p>
          <p>Visibility: {weather.visibility / 1000} km</p>
        </div>
      )}
    </div>
  );
};

export default CurrentWeather;
