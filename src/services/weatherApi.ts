import axios from "axios";
import { WeatherData } from "../types/weather";

const API_KEY = "4f7a530d3ca7c309b75461d8000b2431";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const getWeatherData = async (
  location: string
): Promise<WeatherData> => {
  try {
    const [currentWeatherResponse, forecastResponse] = await Promise.all([
      axios.get(`${BASE_URL}/weather`, {
        params: {
          q: location,
          appid: API_KEY,
          units: "metric",
        },
      }),
      axios.get(`${BASE_URL}/forecast`, {
        params: {
          q: location,
          appid: API_KEY,
          units: "metric",
        },
      }),
    ]);

    return {
      current: {
        temp: currentWeatherResponse.data.main.temp,
        feels_like: currentWeatherResponse.data.main.feels_like,
        temp_min: currentWeatherResponse.data.main.temp_min,
        temp_max: currentWeatherResponse.data.main.temp_max,
        humidity: currentWeatherResponse.data.main.humidity,
        pressure: currentWeatherResponse.data.main.pressure,
        wind_speed: currentWeatherResponse.data.wind.speed,
        description: currentWeatherResponse.data.weather[0].description,
        icon: currentWeatherResponse.data.weather[0].icon,
        visibility: currentWeatherResponse.data.visibility,
      },
      forecast: forecastResponse.data.list.slice(0, 7).map((day: any) => ({
        dt: day.dt,
        temp: {
          min: day.main.temp_min,
          max: day.main.temp_max,
        },
        weather: [
          {
            description: day.weather[0].description,
            icon: day.weather[0].icon,
          },
        ],
      })),
      location: currentWeatherResponse.data.name,
    };
  } catch (error) {
    throw new Error("Failed to fetch weather data");
  }
};
