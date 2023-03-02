import React, { useEffect, useState } from 'react';
import cities from '@/lib/city.list.json';
import { BsSearch } from 'react-icons/bs';
import Link from 'next/link';

export default function Search() {
  const [query, setQuery] = useState('');
  const [queryList, setQueryList] = useState([]);
  const [notFound, setNotFound] = useState(false);

  const onChange = (e) => {
    const { value } = e.target;
    setQuery(value);
    if (value.length < 1) {
      setNotFound(false);
      setQueryList([]);
    }
  };

  useEffect(() => {
    const getLocations = async () => {
      // Prevent illegal query searches:
      if (/^[!@#$%&*()]+$/.test(query)) {
        setNotFound(true);
        return;
      }
      // Get Geo Locations based on query search:
      if (query.length < 1) {
        setQueryList([]);
      } else {
        if (query.trim().length > 1) {
          const data = await cities.filter((city) =>
            city.name.toLowerCase().startsWith(query.toLowerCase())
          );
          // console.log('Locations:', data);
          setQueryList(data.slice(0, 100));
        }
      }
    };
    getLocations();
  }, [query]);

  return (
    <div className='container relative m-auto max-w-lg py-6'>
      <form
        onSubmit={(e) => e.preventDefault()}
        className='flex rounded-xl border p-2 px-4'
      >
        <input
          type='text'
          placeholder='Search for a location...'
          value={query}
          onChange={onChange}
          className='w-full bg-transparent text-xl text-white focus:outline-none'
        />
        <button>
          <BsSearch className='h-5 w-5 text-white' />
        </button>
      </form>
      {queryList.length > 0 && (
        <ul className='absolute z-20 mt-2 h-56 w-full divide-y divide-gray-200/50 overflow-y-auto text-xl text-gray-200'>
          {queryList.map((city) => (
            <li
              key={city.id}
              className='rounded-md bg-gray-600/50 py-2 px-6 backdrop-blur-md hover:bg-gray-200/20 hover:backdrop-blur-md'
            >
              <Link
                href={`/location/${city.id}`}
                onClick={() => setQuery('')}
                className='cursor-pointer'
              >
                {city.name}, {city.state ? ` ${city.state}, ` : ''}{' '}
                {city.country}
              </Link>
            </li>
          ))}
        </ul>
      )}
      {notFound && (
        <ul className='absolute z-20 mt-2 h-56 w-full divide-y divide-gray-200/50 overflow-y-auto text-xl text-gray-200'>
          <li
            className={`rounded-md bg-gray-600/50 py-2 px-6 text-orange-400 backdrop-blur-md`}
          >
            Location not found
          </li>
        </ul>
      )}
    </div>
  );
}
