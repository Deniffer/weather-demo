import { create } from "zustand";
import { getWeatherData } from "../services/weatherApi";
import { WeatherData, WeatherError } from "../types/weather";

interface WeatherStore {
  weatherData: WeatherData | null;
  isLoading: boolean;
  error: WeatherError | null;
  fetchWeather: (location: string) => Promise<void>;
}

export const useWeatherStore = create<WeatherStore>((set) => ({
  weatherData: null,
  isLoading: false,
  error: null,

  fetchWeather: async (location: string) => {
    set({ isLoading: true, error: null });
    try {
      const data = await getWeatherData(location);
      set({ weatherData: data, isLoading: false });
    } catch (error) {
      set({ error: { message: (error as Error).message }, isLoading: false });
    }
  },
}));
