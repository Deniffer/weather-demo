import React from "react";
import { CurrentWeather as CurrentWeatherType } from "../types/weather";

interface CurrentWeatherProps {
  weather: CurrentWeatherType;
  location: string;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({
  weather,
  location,
}) => {
  return (
    <div className="bg-white shadow-md rounded p-4 mb-4">
      <h2 className="text-2xl font-bold mb-2">{location}</h2>
      <div className="flex items-center mb-4">
        <img
          src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`}
          alt={weather.description}
          className="w-16 h-16 mr-4"
        />
        <div>
          <p className="text-4xl">{Math.round(weather.temp)}°C</p>
          <p className="text-gray-600">{weather.description}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="font-bold">High: {Math.round(weather.temp_max)}°C</p>
          <p className="font-bold">Low: {Math.round(weather.temp_min)}°C</p>
        </div>
        <div>
          <p>Feels like: {Math.round(weather.feels_like)}°C</p>
          <p>Humidity: {weather.humidity}%</p>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
