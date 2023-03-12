import React, { useEffect, useRef } from 'react';
import moment from 'moment';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { weatherCodeMapping, weatherLabelMapping } from '@/lib/weatherMapping';
import { useVirtualizer } from '@tanstack/react-virtual';

export default function Hourly({ hourlyData }) {
  const listRef = useRef();

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
    count: hourlyData.length,
    getScrollElement: () => listRef.current,
    estimateSize: () => hourlyData.length,
    overscan: 5,
  });

  const Column = (index) => {
    let Icon = weatherCodeMapping[hourlyData[index].weathercode];
    const time = hourlyData[index].time;
    return (
      <li className='mx-1 flex h-48 flex-col items-center justify-center gap-2 rounded-lg bg-blue-300/20 capitalize'>
        {/* {weatherLabelMapping[57]} */}
        {weatherLabelMapping[hourlyData[index].weathercode]}
        <span className='flex items-center text-xl font-medium'>
          <Icon size={35} color={'white'} />
          {hourlyData[index].temperature_2m}°C
        </span>
        <span>{moment(time).format('dddd D')}</span>
        <span>{moment(time).format('h:mm A')}</span>
      </li>
    );
  };

  return (
    <div className='relative'>
      <h1 className='w-full text-2xl font-light tracking-widest'>Hourly</h1>
      <BsChevronCompactLeft
        size={30}
        className='absolute top-1/2 left-0 z-10 cursor-pointer rounded-full bg-gray-300 text-gray-900  opacity-25 backdrop-blur-sm hover:opacity-100'
      />

      <div
        ref={listRef}
        className='List h-56 w-full overflow-auto scrollbar-hide'
      >
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
        className='absolute top-1/2 right-0 ml-9 cursor-pointer rounded-full  bg-gray-300 text-gray-900 opacity-25 hover:opacity-100'
      />
    </div>
  );
}
