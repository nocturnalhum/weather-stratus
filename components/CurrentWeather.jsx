import React from 'react';
import moment from 'moment';
import { weatherCodeMapping, weatherLabelMapping } from '@/lib/weatherMapping';
import HumidityPressure from './HumidityPressure';
import Main from './Main';
import Hourly from './Hourly';

export default function CurrentWeather({ currentOpenWeather, currentMeteo }) {
  const { clouds, dt, main, name, sys, timezone, visibility, weather, wind } =
    currentOpenWeather;

  const { hourly } = currentMeteo;
  let hourlyData = [];

  for (let i = 0; i < hourly.time.length; i++) {
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
  console.log('currentMeteo', currentMeteo);

  return (
    <div className='relative max-w-3xl'>
      <div className='h-1/2 w-1/2 rounded-2xl bg-gray-600'></div>
      <div className=' mb-4 min-h-full rounded-2xl border-2 border-gray-600/70 border-r-gray-400 border-t-gray-300/30 bg-gray-600 bg-opacity-25 bg-cover p-3 shadow-inner backdrop-blur-md'>
        <div className='grid min-h-full grid-cols-1 gap-4 text-white'>
          <HumidityPressure
            humidity={main.humidity}
            pressure={main.pressure}
            visibility={visibility}
            wind={wind}
          />
          <Main main={main} sys={sys} timezone={timezone} />
          <Hourly hourlyData={hourlyData} />
        </div>
      </div>
    </div>
  );
}
