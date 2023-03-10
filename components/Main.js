import React from 'react';
import getTime from '@/lib/getTime';
import { WiHorizon, WiHorizonAlt } from 'react-icons/wi';

export default function Main({ main, sys, timezone }) {
  return (
    <div className='h-18 flex justify-between bg-gray-500/20'>
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
  );
}
