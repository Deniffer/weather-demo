import React, { useEffect, KeyboardEvent } from "react";
import { useWeatherStore } from "./hooks/useWeatherStore";
import CurrentWeather from "./components/CurrentWeather";
import WeatherToggle from "./components/WeatherToggle";
import WeatherForecast from "./components/WeatherForecast";

const App: React.FC = () => {
  const { fetchWeather, weatherData } = useWeatherStore();

  useEffect(() => {
    fetchWeather("New York");
  }, []);

  const handleLocationChange = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const target = e.target as HTMLInputElement;
      fetchWeather(target.value);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Weather App</h1>
      <input
        type="text"
        placeholder="Enter location"
        className="w-full p-2 mb-4 border rounded"
        onKeyPress={handleLocationChange}
      />

      {weatherData && (
        <>
          <CurrentWeather
            weather={weatherData.current}
            location={weatherData.location}
          />
          <WeatherToggle />
          <WeatherForecast forecast={weatherData.forecast} />
        </>
      )}
    </div>
  );
};

export default App;
