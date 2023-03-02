import React from 'react';
import { BsSearch } from 'react-icons/bs';

export default function Search() {
  return (
    <div className='container relative m-auto max-w-lg py-6'>
      <form className='flex rounded-xl border p-2 px-4'>
        <input
          type='text'
          placeholder='Search for a location...'
          className='w-full bg-transparent text-xl text-white focus:outline-none'
        />
        <button>
          <BsSearch size={20} color={'white'} />
        </button>
      </form>
    </div>
  );
}
