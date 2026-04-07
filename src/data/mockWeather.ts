import type { CurrentWeather } from '../types'

export const mockWeather: CurrentWeather = {
  city: 'Johannesburg',
  temperature: 22,
  feelsLike: 20,
  condition: 'partly-cloudy',
  humidity: 58,
  wind: 14,
  forecast: [
    { day: 'Mon', condition: 'sunny', high: 25, low: 14 },
    { day: 'Tue', condition: 'partly-cloudy', high: 22, low: 13 },
    { day: 'Wed', condition: 'cloudy', high: 18, low: 12 },
    { day: 'Thu', condition: 'rainy', high: 16, low: 11 },
    { day: 'Fri', condition: 'sunny', high: 24, low: 15 },
  ],
}
