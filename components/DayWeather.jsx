import moment from 'moment';

function DayWeather({ Icon, label, temperature, date }) {
  return (
    <div className='mb-4   capitalize text-gray-50'>
      <div className='flex w-36 flex-col items-center justify-center gap-1 rounded-lg bg-blue-300/30 py-4'>
        <span className='text-sm'>{label}</span>
        <Icon
          size={45}
          color={'white'}
          className='rounded-full border-2 border-l-gray-500/50 border-b-gray-700/50 border-t-gray-300/50 bg-slate-500 backdrop-blur-md'
        />
        <span className='mb-2 flex items-center text-lg'>{temperature}°C</span>
        <span className='text-sm'>{moment(date).format('dddd D')}</span>
        <span className='text-sm'>{moment(date).format('h:mm A')}</span>
      </div>
    </div>
  );
}

export default DayWeather;
