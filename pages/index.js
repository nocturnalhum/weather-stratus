import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Stratus Weather</title>
        <meta name='description' content='Daily and Forecast Weather app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='text-3xl underline'>
        <h1>Stratus Weather</h1>
      </main>
    </>
  );
}
