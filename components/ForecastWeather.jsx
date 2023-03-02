import React from 'react';

export default function ForecastWeather({ forecast }) {
  const { city, list } = forecast;
  return (
    <div>
      <div className='flex justify-between'>
        <h1 className='text-2xl'>{`${city.name}, ${city.country}`}</h1>
        <h1 className='text-2xl'>Forecast Weather</h1>
      </div>
      <div className='h-full rounded-2xl border-2 border-gray-600/70 border-r-gray-400 border-t-gray-500 bg-gray-600/30 bg-clip-padding p-5 shadow-inner backdrop-blur-sm'>
        {city.name}, {city.country}
      </div>
    </div>
  );
}
