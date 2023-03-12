import {
  WiBarometer,
  WiCelsius,
  WiCloudy,
  WiDayCloudy,
  WiDayHail,
  WiDayHaze,
  WiDayRain,
  WiDayRainMix,
  WiDayShowers,
  WiDaySleet,
  WiDaySleetStorm,
  WiDaySnow,
  WiDaySnowThunderstorm,
  WiDaySnowWind,
  WiDaySprinkle,
  WiDayStormShowers,
  WiDaySunny,
  WiDayThunderstorm,
  WiFog,
  WiHorizon,
  WiHorizonAlt,
  WiHumidity,
  WiStrongWind,
  WiWindDeg,
} from 'react-icons/wi';

export const weatherCodeMapping = {
  0: WiDaySunny,
  1: WiDayHaze,
  2: WiDayCloudy,
  3: WiCloudy,
  45: WiFog,
  48: WiFog,
  51: WiDayRainMix,
  53: WiDayHail,
  55: WiDayRain,
  56: WiDayRainMix,
  57: WiDaySleetStorm,
  61: WiDayRainMix,
  63: WiDayShowers,
  65: WiDaySprinkle,
  66: WiDaySleet,
  67: WiDaySleet,
  71: WiDaySnowWind,
  73: WiDaySnowWind,
  75: WiDaySnowWind,
  77: WiDayHail,
  80: WiDayRainMix,
  81: WiDayStormShowers,
  82: WiDayThunderstorm,
  85: WiDaySnow,
  86: WiDaySnow,
  95: WiDayThunderstorm,
  96: WiDaySleetStorm,
  99: WiDaySnowThunderstorm,
};

export const weatherLabelMapping = {
  0: 'clear sky',
  1: 'mainly clear',
  2: 'partly cloudy',
  3: 'overcast',
  45: 'fog',
  48: 'depositing rime fog',
  51: 'light drizzle',
  53: 'mod. drizzle',
  55: 'dense drizzle',
  56: 'lo freezing drizzle',
  57: 'hi freezing drizzle',
  61: 'light rain',
  63: 'mod. rain',
  65: 'heavy rain',
  66: 'light freezing rain',
  67: 'heavy freezing rain',
  71: 'light snowfall',
  73: 'mod. snowfall',
  75: 'heavy snowfall',
  77: 'hail',
  80: 'light rain showers',
  81: 'mod. rain showers',
  82: 'violent rain showers',
  85: 'light snow showers',
  86: 'heavy snow showers',
  95: 'light thunderstorm',
  96: 'mod. thunderstorm',
  99: 'thunderstorm & hail',
};