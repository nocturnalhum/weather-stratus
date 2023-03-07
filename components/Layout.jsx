import Head from 'next/head';
import React from 'react';
import Search from './Search';

export default function Layout({ children, title }) {
  return (
    <>
      <Head>
        <title>{title ? title + ' - Stratus' : 'Stratus Weather'}</title>
      </Head>

      <main className='relative min-h-screen overflow-y-auto bg-landscape bg-cover bg-center'>
        {/* Overlay  */}
        <div className='fixed inset-0 bg-black/50'></div>
        <Search className='z-20' />
        {children}
      </main>
    </>
  );
}
