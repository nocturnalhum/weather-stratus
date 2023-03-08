import React from 'react';
import getTime from '@/lib/getTime';
import moment from 'moment';
import Image from 'next/image';

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
import { ImEye } from 'react-icons/im';
import { IconBase } from 'react-icons';
import DayWeather from './DayWeather';

const weatherCodeMapping = {
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
const weatherLabelMapping = {
  0: 'clear sky',
  1: 'mainly clear',
  2: 'partly cloudy',
  3: 'overcast',
  45: 'fog',
  48: 'depositing rime fog',
  51: 'light drizzle',
  53: 'moderate drizzle',
  55: 'dense drizzle',
  56: 'light freezing drizzle',
  57: 'dense freezing drizzle',
  61: 'light rain',
  63: 'moderate rain',
  65: 'heavy rain',
  66: 'light freezing rain',
  67: 'heavy freezing rain',
  71: 'light snowfall',
  73: 'moderate snowfall',
  75: 'heavy snowfall',
  77: 'hail',
  80: 'light rain showers',
  81: 'moderate rain showers',
  82: 'violent rain showers',
  85: 'light snow showers',
  86: 'heavy snow showers',
  95: 'light thunderstorm',
  96: 'moderate thunderstorm',
  99: 'thunderstorm with hail',
};

export default function CurrentWeather({ currentOpenWeather, currentMeteo }) {
  const { clouds, dt, main, name, sys, timezone, visibility, weather, wind } =
    currentOpenWeather;
  console.log('WIND DEG', wind.deg);

  const { hourly } = currentMeteo;
  let hourlyData = [];

  for (let i = 0; i < hourly?.time?.length; i++) {
    hourlyData.push({
      time: hourly?.time[i],
      temperature_2m: hourly?.temperature_2m[i],
      rain: hourly?.rain[i],
      showers: hourly?.showers[i],
      snowfall: hourly?.snowfall[i],
      weathercode: hourly?.weathercode[i],
      windspeed_10m: hourly?.windspeed_10m[i],
    });
  }

  console.log('hourlyData', hourlyData);

  const background = 'bg-fuchsia-500/0';

  return (
    <div className='mb-4 min-h-full rounded-2xl border-2 border-gray-600/70 border-r-gray-400 border-t-gray-300/30 bg-gray-600/30 bg-cover p-3 shadow-inner backdrop-blur-md'>
      <div className='grid min-h-full grid-cols-1 gap-4 text-white'>
        <div className='h-16 rounded-xl bg-gray-300/20 p-2 shadow-lg shadow-gray-900/30 backdrop-blur-sm'>
          <ul className='flex justify-between text-sm'>
            <li className='flex flex-col items-center justify-center'>
              <span className='mb-1 text-base font-semibold'>Humidity</span>
              <span className='flex items-center justify-start gap-1'>
                <WiHumidity
                  size={20}
                  color={'white'}
                  className='rounded-full border'
                />
                {main.humidity} %
              </span>
            </li>
            <li className='flex flex-col items-center justify-center'>
              <span className='mb-1 text-base font-semibold'>Pressure</span>
              <span className='flex items-center justify-start gap-1'>
                <WiBarometer
                  size={20}
                  color={'white'}
                  className='rounded-full border'
                />
                {main.pressure} hPa
              </span>
            </li>
            <li className='flex flex-col items-center justify-center'>
              <span className='mb-1 text-base font-semibold'>Visibility</span>
              <span className='flex items-center justify-start gap-1'>
                <ImEye
                  size={15}
                  color={'white'}
                  className='rounded-full border'
                />
                {`> ${Math.round(visibility / 1000)} km`}
              </span>
            </li>
            <li className='flex flex-col items-center justify-center'>
              <span className='mb-1 text-base font-semibold'>Wind</span>
              <span className='flex items-center justify-start gap-1'>
                <WiStrongWind
                  size={20}
                  color={'white'}
                  className='rounded-full border'
                />
                {wind.speed} m/s
                <WiWindDeg
                  size={20}
                  color={'white'}
                  style={{ transform: `rotate(${wind.deg + 180}deg)` }}
                />
              </span>
            </li>
          </ul>
        </div>
        <div className='h-18 flex flex-col justify-between bg-gray-500/20'>
          <div className='text-5xl'>{Math.round(main?.temp)}°C</div>
          <div>feels like:{Math.round(main?.feels_like)}°C</div>
          <div className='flex flex-col'>
            <span className='text-orange-200'>
              Sunrise:
              <span className='flex'>
                <WiHorizonAlt size={25} />
                {getTime(sys?.sunrise, timezone)}
              </span>
            </span>
            <span className='text-orange-400'>
              Sunset:
              <span className='flex'>
                <WiHorizon size={25} />
                {getTime(sys?.sunset, timezone)}
              </span>
            </span>
          </div>
        </div>
        <h1 className='text-2xl font-semibold'>Hourlys</h1>
        <div className='flex h-56 flex-row space-x-4 overflow-x-auto'>
          TEST COMPONENT
          {/* {hourlyData.map((hour) => (
            <DayWeather
              key={hour.time}
              date={hour.time}
              Icon={weatherCodeMapping[hour.weathercode]}
              label={weatherLabelMapping[hour.weathercode]}
              temperature={hour.temperature_2m}
            />
          ))} */}
        </div>
      </div>
    </div>
  );
}
