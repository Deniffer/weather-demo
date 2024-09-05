import React, { useEffect, useState } from 'react';
import { useWeatherStore } from './hooks/useWeatherStore';
import CurrentWeather from './components/CurrentWeather';
import WeatherForecast from './components/WeatherForecast';
import LocationInput from './components/LocationInput';
import './App.css';

const App: React.FC = () => {
  const { weatherData, isLoading, error, fetchWeather } = useWeatherStore();
  const [location, setLocation] = useState('New York');

  useEffect(() => {
    fetchWeather(location);
  }, [location]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-blue-600 text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Weather App</h1>
        <LocationInput onLocationChange={setLocation} />
        {isLoading && <p className="text-center">Loading weather data...</p>}
        {error && <p className="text-center text-red-300">{error.message}</p>}
        {weatherData && (
          <div className="space-y-6">
            <CurrentWeather weather={weatherData.current} location={weatherData.location} />
            <WeatherForecast forecast={weatherData.forecast} />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
