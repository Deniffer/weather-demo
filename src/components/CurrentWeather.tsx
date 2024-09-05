import React, { useState } from "react";
import { CurrentWeather as CurrentWeatherType } from "../types/weather";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

interface CurrentWeatherProps {
  weather: CurrentWeatherType;
  location: string;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ weather, location }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <Card className="bg-white bg-opacity-20 backdrop-blur-lg shadow-lg">
      <CardHeader>
        <CardTitle>{location}</CardTitle>
      </CardHeader>
      <CardContent>
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
        <Button
          className="w-full"
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? "Hide Details" : "Show Details"}
        </Button>
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
      </CardContent>
    </Card>
  );
};

export default CurrentWeather;
