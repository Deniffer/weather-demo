import React, { useState } from "react";
import { CurrentWeather as CurrentWeatherType } from "../types/weather";

interface CurrentWeatherProps {
  weather: CurrentWeatherType;
  location: string;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ weather, location }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg shadow-lg p-6">
      <h2 className="text-3xl font-bold mb-4">{location}</h2>
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        <div className="flex items-center mb-4 md:mb-0">
          <img
            src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`}
            alt={weather.description}
            className="w-24 h-24 mr-4"
          />
          <div>
            <p className="text-6xl font-bold">{Math.round(weather.temp)}°C</p>
            <p className="text-xl capitalize">{weather.description}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xl">High: {Math.round(weather.temp_max)}°C</p>
          <p className="text-xl">Low: {Math.round(weather.temp_min)}°C</p>
        </div>
      </div>
      <button
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors"
        onClick={() => setShowDetails(!showDetails)}
      >
        {showDetails ? "Hide Details" : "Show Details"}
      </button>
      {showDetails && (
        <div className="mt-6 grid grid-cols-2 gap-4 text-lg">
          <p>Wind Speed: {weather.wind_speed} m/s</p>
          <p>Humidity: {weather.humidity}%</p>
          <p>Pressure: {weather.pressure} hPa</p>
          <p>Visibility: {weather.visibility / 1000} km</p>
          <p>Sunrise: {weather.sunrise}</p>
          <p>Sunset: {weather.sunset}</p>
        </div>
      )}
    </div>
  );
};

export default CurrentWeather;
