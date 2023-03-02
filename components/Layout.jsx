import Head from 'next/head';
import React from 'react';

export default function Layout({ children, title }) {
  return (
    <>
      <Head>
        <title>{title ? title + ' - Stratus' : 'Stratus Weather'}</title>
        <meta name='description' content='Daily and Forecast Weather app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='min-h-screen bg-landscape bg-cover bg-center'>
        {/* Overlay  */}
        <div className='absolute left-0 right-0 top-0 bottom-0 bg-black/50' />
        {children}
      </main>
    </>
  );
}
