import CurrentWeather from '@/components/CurrentWeather';
import ForecastWeather from '@/components/ForecastWeather';
import Layout from '@/components/Layout';
import React, { useState } from 'react';

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_KEY;

export default function City({ currentWeather, forecast }) {
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  console.log('CURRENT WEATHER', currentWeather);
  console.log('CURRENT FORECAST', forecast);
  return (
    <div>
      <Layout title={currentWeather.name}>
        <div className='group m-auto max-w-3xl px-2 text-white perspective'>
          <button
            onClick={handleToggle}
            className='mb-2 w-40  rounded-full bg-black/50 p-2 font-semibold backdrop-blur-sm'
          >
            <span>See: </span>
            {!toggle ? 'Forecast' : 'Current'}
          </button>
          <div
            className={`relative duration-500 preserve-3d ${
              toggle ? 'rotate-y-180' : ''
            }`}
          >
            {/* Side One: */}
            <div
              className={`absolute z-10 h-full w-full duration-300  ${
                toggle ? 'opacity-0' : 'opacity-100'
              }`}
            >
              <CurrentWeather current={currentWeather} />
            </div>
            {/* Side Two: */}
            <div
              className={`absolute h-full w-full duration-300 rotate-y-180 ${
                toggle ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <ForecastWeather forecast={forecast} />
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}

// ============================================================================
// ===============<<< Get Server Side Props >>>================================
// ============================================================================
export async function getServerSideProps({ params }) {
  const cityID = params.city;

  if (!cityID) {
    return {
      notFound: true,
    };
  }

  // Get Weather:
  const weatherRes = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?id=${cityID}&units=metric&appid=${API_KEY}`
  );
  const currentWeather = await weatherRes.json();

  // Get Forecast:
  const forecastRes = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?id=${cityID}&units=metric&appid=${API_KEY}`
  );
  const forecast = await forecastRes.json();

  if (!currentWeather || !forecast) {
    return {
      notFound: true,
    };
  }

  return {
    props: { currentWeather, forecast },
  };
}
