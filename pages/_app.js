import Layout from '@/components/Layout';
import '@/styles/globals.css';
import Head from 'next/head';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import { BsSun } from 'react-icons/bs';

export default function App({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const start = () => {
      console.log('start');
      setLoading(true);
    };
    const end = () => {
      console.log('finished');
      setLoading(false);
    };
    Router.events.on('routeChangeStart', start);
    Router.events.on('routeChangeComplete', end);
    Router.events.on('routeChangeError', end);
    return () => {
      Router.events.off('routeChangeStart', start);
      Router.events.off('routeChangeComplete', end);
      Router.events.off('routeChangeError', end);
    };
  }, []);
  return (
    <>
      {loading ? (
        <Layout title='Loading...' className='relative'>
          <BsSun
            size={40}
            className='absolute top-1/3 w-full animate-spin-slow text-white/80'
          />
        </Layout>
      ) : (
        <Component {...pageProps} />
      )}
    </>
  );
}
