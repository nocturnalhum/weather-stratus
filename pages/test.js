// import Layout from '@/components/Layout';
// import React from 'react';

// export default function Test() {
//   return (
//     <main className='relative flex h-[calc(100vh-5rem)] w-full items-center justify-center'>
//       <div className='flex h-1/2 w-1/2 items-center justify-center rounded-2xl bg-gray-300 bg-opacity-20 text-5xl font-semibold   backdrop-blur-sm'>
//         <h1 className='text-white'>Test</h1>
//       </div>
//     </main>
//   );
// }

import React, { useState } from 'react';

export default function Test() {
  const [slide, setSlide] = useState(0);
  const slideImage = () => {
    if (slide > 3) {
      setSlide(0);
    }
    setSlide((prev) => prev + 1);
  };
  return (
    <main
      className='relative flex min-h-screen w-full flex-col items-center justify-start overflow-hidden bg-landscape bg-cover bg-center font-bold text-fuchsia-500 underline'
      onClick={slideImage}
    >
      <div
        className={`absolute h-full w-full  bg-weather bg-cover bg-center ease-out ${
          slide === 1
            ? 'translate-y-0 duration-1000'
            : 'translate-y-[100%] delay-1000'
        }  flex items-center justify-center`}
      ></div>
      <div
        className={`absolute h-full w-full bg-snow bg-cover bg-center duration-1000 ease-out ${
          slide === 2
            ? 'translate-y-0 duration-1000'
            : 'translate-y-[100%]  delay-1000'
        }  flex items-center justify-center`}
      ></div>
      <div
        className={`absolute h-full w-full bg-mountains bg-cover bg-center duration-1000 ease-out ${
          slide === 3 ? 'translate-y-0 duration-1000' : 'translate-y-[100%]'
        }  flex items-center justify-center`}
      ></div>
    </main>
  );
}
