import React, { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import { weatherCodeMapping, weatherLabelMapping } from '@/lib/weatherMapping';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { useVirtualizer } from '@tanstack/react-virtual';
import DayWeather from './DayWeather';
import HumidityPressure from './HumidityPressure';
import Main from './Main';

export default function CurrentWeather({ currentOpenWeather, currentMeteo }) {
  const [scrollOffset, setScrollOffset] = useState(5);
  const [scrolling, setScrolling] = useState(false);
  const listRef = useRef();

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

  useEffect(() => {
    const scrollPos = listRef.current;
    if (scrollPos) {
      const onWheel = (event) => {
        if (event.deltaY == 0) return;
        event.preventDefault();
        scrollPos.scrollTo({
          left: scrollPos.scrollLeft + event.deltaY,
          behavior: 'smooth',
        });
      };
      scrollPos.addEventListener('wheel', onWheel);
      return () => scrollPos.removeEventListener('wheel', onWheel);
    }
  }, []);

  const columnVirtualizer = useVirtualizer({
    horizontal: true,
    count: hourly.time.length,
    getScrollElement: () => listRef.current,
    estimateSize: () => hourly.time.length,
    overscan: 5,
  });

  const Column = (index) => {
    let Icon = weatherCodeMapping[hourlyData[index].weathercode];
    const time = hourlyData[index].time;
    return (
      <li className='mx-2 flex h-48 flex-col items-center justify-center gap-2 rounded-lg bg-blue-300/20'>
        <span className='text-sm capitalize'>
          {weatherLabelMapping[hourlyData[index].weathercode]}
        </span>
        <span className='flex items-center text-xl font-medium'>
          {hourlyData[index].temperature_2m}°C
          <Icon size={35} color={'white'} />
        </span>
        <span>{moment(time).format('dddd D')}</span>
        <span>{moment(time).format('h:mm A')}</span>
      </li>
    );
  };

  return (
    <div className='mb-4 min-h-full rounded-2xl border-2 border-gray-600/70 border-r-gray-400 border-t-gray-300/30 bg-gray-600/30 bg-cover p-3 shadow-inner backdrop-blur-md'>
      <div className='grid min-h-full grid-cols-1 gap-4 text-white'>
        <HumidityPressure
          humidity={main.humidity}
          pressure={main.press}
          visibility={visibility}
          wind={wind}
        />
        <Main main={main} sys={sys} timezone={timezone} />
        <div className='flex items-center duration-500'>
          <h1 className='mb-4 w-full text-2xl font-semibold'>Hourly</h1>
        </div>

        <BsChevronCompactLeft
          size={30}
          className='absolute bottom-0 left-0 cursor-pointer rounded-full bg-gray-300 text-gray-900 opacity-25 hover:opacity-100'
        />

        <div ref={listRef} className='List h-56 w-full overflow-auto'>
          <div
            style={{
              width: `${columnVirtualizer.getTotalSize()}px`,
              height: '100%',
              position: 'relative',
            }}
          >
            {columnVirtualizer.getVirtualItems().map((virtualColumn) => (
              <div
                key={virtualColumn.index}
                className='absolute top-0 left-0 h-full'
                style={{
                  width: `${virtualColumn.size}px`,
                  transform: `translateX(${virtualColumn.start}px)`,
                }}
              >
                {Column(virtualColumn.index)}
              </div>
            ))}
          </div>
        </div>
        <BsChevronCompactRight
          size={30}
          className='absolute bottom-0 right-0 ml-9 cursor-pointer rounded-full  bg-gray-300 text-gray-900 opacity-25 hover:opacity-100'
        />
      </div>
    </div>
  );
}
