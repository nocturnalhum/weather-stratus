import getTime from '@/lib/getTime';
import Image from 'next/image';
import React from 'react';
import {
  WiBarometer,
  WiHumidity,
  WiStrongWind,
  WiWindDeg,
} from 'react-icons/wi';
import { ImEye } from 'react-icons/im';

export default function CurrentWeather({ current }) {
  const { clouds, dt, main, name, sys, timezone, visibility, weather, wind } =
    current;
  console.log('WIND DEG', wind.deg);
  const background = 'bg-fuchsia-500/0';

  return (
    <div className='mb-4 min-h-full rounded-2xl border-2 border-gray-600/70 border-r-gray-400 border-t-gray-300/30 bg-gray-600/30 bg-cover p-3 shadow-inner backdrop-blur-sm'>
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
              {getTime(sys?.sunrise, timezone)}
            </span>
            <span className='text-orange-400'>
              Sunset:{' '}
              <span className='ml-1'>{getTime(sys?.sunset, timezone)}</span>
            </span>
          </div>
        </div>
        <div className='h-16 bg-gray-300'></div>
        <div className='grid grid-cols-2 gap-4'>
          <div className='h-16 bg-gray-400'></div>
          <div className='h-16 bg-gray-500'></div>
        </div>
      </div>
    </div>
  );
}
