import React, { useState } from 'react';
import { BsSearch } from 'react-icons/bs';

export default function Search() {
  const [query, setQuery] = useState('');

  const onChange = (e) => {
    const { value } = e.target;
    setQuery(value);
  };

  return (
    <div className='container relative m-auto max-w-lg py-6'>
      <form className='flex rounded-xl border p-2 px-4'>
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
    </div>
  );
}
