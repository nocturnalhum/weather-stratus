import React from 'react';

export default function ForecastWeather({ forecast }) {
  const { city, list } = forecast;
  return (
    <div className='min-h-full rounded-2xl border-2 border-gray-600/70 border-r-gray-400 border-t-gray-500 bg-gray-600/30 p-5 shadow-inner backdrop-blur-sm'>
      {city?.name}, {city?.country}
    </div>
  );
}
