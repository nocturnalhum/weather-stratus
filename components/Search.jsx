import React, { useEffect, useState } from 'react';
import cities from '@/lib/city.list.json';
import { BsSearch } from 'react-icons/bs';
import Link from 'next/link';
import useDebounce from '@/lib/useDebounce';

export default function Search() {
  const [query, setQuery] = useState('');
  const [queryList, setQueryList] = useState([]);
  const [notFound, setNotFound] = useState(false);

  const debounceSearch = useDebounce(query, 500);

  const onChange = (e) => {
    const { value } = e.target;
    setQuery(value);
    if (value.length < 1) {
      setNotFound(false);
      setQueryList([]);
    }
  };

  useEffect(() => {
    console.log('Debounce', debounceSearch);
    const getLocations = async () => {
      // Prevent illegal query searches:
      if (/[!@#$%^&*()+={}\[\]?<>\/\\?]/g.test(debounceSearch)) {
        setNotFound(true);
        return;
      } else {
        setNotFound(false);
      }
      // Get Geo Locations based on query search:
      if (debounceSearch.length < 1) {
        setQueryList([]);
        return;
      } else {
        // **********<<< GeoCoding search >>>***************:
        if (debounceSearch.trim().length > 1) {
          console.log('Test', debounceSearch);
          const res = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${debounceSearch}&count=50`
          );
          const { results } = await res.json();
          console.log('Locations:', results);
          if (!results) {
            setQueryList([]);
            return;
          }
          setQueryList(results);
          // **********<<< cities.list.json search >>>***************:
          // if (debounceSearch.trim().length > 1) {
          //   const data = cities.filter((city) =>
          //     city.name.toLowerCase().startsWith(debounceSearch.toLowerCase())
          //   );
          //   // console.log('Locations:', data);
          //   setQueryList(data.slice(0, 100));
        }
      }
    };
    getLocations();
  }, [debounceSearch]);

  return (
    <div className='relative m-auto max-w-lg py-4'>
      <form
        onSubmit={(e) => e.preventDefault()}
        className='mx-2 flex rounded-xl border p-2 px-4'
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
        <ul className='absolute z-20 mt-2 max-h-56 w-full divide-y divide-gray-200/50 overflow-y-auto rounded-lg bg-gradient-to-t from-black/10 to-white/10 text-xl text-gray-200'>
          {queryList.map((city) => (
            <li
              key={city.id}
              className='rounded-md bg-gray-600/50 py-2 px-6 backdrop-blur-md hover:bg-gray-200/20 hover:backdrop-blur-md'
            >
              <Link
                href={`/location/${city.latitude}&${city.longitude}`}
                onClick={() => setQuery('')}
                className='cursor-pointer'
              >
                <div>
                  {city.name}, {city.admin1 ? ` ${city.admin1}, ` : ''}{' '}
                  {city.country ? city.country : city.country_code}
                </div>
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
            Character not recognized
          </li>
        </ul>
      )}
    </div>
  );
}
