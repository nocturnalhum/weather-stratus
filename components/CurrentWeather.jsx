import getTime from '@/lib/getTime';
import React from 'react';

export default function CurrentWeather({ current }) {
  const { clouds, dt, main, name, sys, timezone, visibility, weather, wind } =
    current;

  const background = 'bg-fuchsia-500/0';

  return (
    <div>
      <div className='flex justify-between'>
        <h1 className='text-2xl'>{`${name}, ${sys.country}`}</h1>
      </div>
      <div className='h-full rounded-2xl border-2 border-gray-600/70 border-r-gray-400 border-t-gray-300/30 bg-gray-600/30 bg-clip-padding p-5 shadow-inner backdrop-blur-sm'>
        <div className='text-3xl'>{Math.round(main.temp)}°C</div>
        <div className='flex flex-col'>
          <span className='text-orange-200'>
            Sunrise: {getTime(sys.sunrise, timezone)}
          </span>
          <span className='text-orange-400'>
            Sunset: {getTime(sys.sunset, timezone)}
          </span>
        </div>
      </div>
    </div>
  );
}
