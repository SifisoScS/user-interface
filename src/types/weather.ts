export type WeatherCondition = 'sunny' | 'cloudy' | 'rainy' | 'stormy' | 'windy' | 'partly-cloudy'

export interface WeatherDay {
  day: string
  condition: WeatherCondition
  high: number
  low: number
}

export interface CurrentWeather {
  city: string
  temperature: number
  feelsLike: number
  condition: WeatherCondition
  humidity: number
  wind: number
  forecast: WeatherDay[]
}
