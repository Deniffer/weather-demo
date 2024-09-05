export interface CurrentWeather {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  humidity: number;
  pressure: number;
  wind_speed: number;
  description: string;
  icon: string;
  visibility: number;
}

export interface ForecastDay {
  dt: number;
  temp: {
    min: number;
    max: number;
  };
  weather: [
    {
      description: string;
      icon: string;
    }
  ];
}

export interface WeatherData {
  current: CurrentWeather;
  forecast: ForecastDay[];
  location: string;
}

export interface WeatherError {
  message: string;
}
