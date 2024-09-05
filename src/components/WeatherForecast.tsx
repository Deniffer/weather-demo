import React from "react";
import { ForecastDay } from "../types/weather";

interface WeatherForecastProps {
  forecast: ForecastDay[];
}

const WeatherForecast: React.FC<WeatherForecastProps> = ({ forecast }) => {
  return (
    <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">7-Day Forecast</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {forecast.map((day, index) => (
          <div key={index} className="text-center p-3 bg-white bg-opacity-30 rounded-lg">
            <p className="font-bold">
              {new Date(day.dt * 1000).toLocaleDateString("en-US", {
                weekday: "short",
              })}
            </p>
            <img
              src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
              alt={day.weather[0].description}
              className="w-16 h-16 mx-auto"
            />
            <p className="text-lg font-semibold">{Math.round(day.temp.max)}°C</p>
            <p className="text-sm">{Math.round(day.temp.min)}°C</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherForecast;
