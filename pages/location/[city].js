import CurrentWeather from '@/components/CurrentWeather';
import ForecastWeather from '@/components/ForecastWeather';
import Layout from '@/components/Layout';
import React, { useState } from 'react';

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_KEY;
const METEO_QUERY = process.env.NEXT_PUBLIC_METEO_QUERY;

export default function City({ currentOpenWeather, currentMeteo, forecast }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  // console.log('CURRENT WEATHER', currentOpenWeather);
  // console.log('CURRENT METEO', currentMeteo);
  // console.log('CURRENT FORECAST', forecast);

  return (
    <Layout title={currentOpenWeather.name}>
      <div className=' m-auto max-w-3xl px-2 text-white perspective'>
        <div className='mx-2 mb-2 flex items-end justify-between'>
          <h2 className='text-3xl font-semibold'>{currentOpenWeather.name}</h2>
          <button
            onClick={handleClick}
            className='h-auto w-32 rounded-full bg-black/50 px-4 py-2 font-semibold backdrop-blur-sm'
          >
            <span>{!isFlipped ? 'Forecast' : 'Current'}</span>
          </button>
        </div>
        <div
          className={`relative h-full w-full duration-500 preserve-3d  backface-hidden ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
        >
          {/* Side One: */}
          <div className='absolute z-10 h-full w-full backface-hidden'>
            <CurrentWeather
              currentOpenWeather={currentOpenWeather}
              currentMeteo={currentMeteo}
            />
          </div>
          {/* Side Two: */}
          <div className='absolute h-full w-full rotate-y-180 backface-hidden'>
            <ForecastWeather forecast={forecast} />
          </div>
        </div>
      </div>
    </Layout>
  );
}

// ============================================================================
// ===============<<< Get Server Side Props >>>================================
// ============================================================================
export async function getServerSideProps({ params }) {
  // const cityID = params.city;
  const { 0: lat, 1: lon } = params.city.split('&');
  console.log('Params', lat, lon);

  if (!lat || !lon) {
    return {
      notFound: true,
    };
  }

  // Get Weather OPENWEATHER API:
  const openWeatherRes = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
  );
  const currentOpenWeather = await openWeatherRes.json();
  console.log('currentOpenWeather', currentOpenWeather);

  // Get Weather METEO API:
  const meteoRes = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&${METEO_QUERY}`
  );
  const currentMeteo = await meteoRes.json();

  // Get Forecast:
  const forecastRes = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
  );
  const forecast = await forecastRes.json();

  if (!currentOpenWeather || !currentMeteo || !forecast) {
    return {
      notFound: true,
    };
  }

  return {
    props: { currentOpenWeather, currentMeteo, forecast },
  };
}
