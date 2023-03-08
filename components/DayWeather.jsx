import moment from 'moment';

function DayWeather({ Icon, label, temperature, date }) {
  return (
    <div className='mb-4 rounded-lg bg-sky-400/20 capitalize text-gray-50 shadow-md'>
      <div className='flex w-36 flex-col items-center justify-center gap-1 py-4'>
        <span className='text-sm'>{label}</span>
        <Icon size={45} color={'white'} />
        <span className='mb-2 flex items-center text-lg'>{temperature}°C</span>
        <span className='text-sm'>{moment(date).format('dddd D')}</span>
        <span className='text-sm'>{moment(date).format('h:mm A')}</span>
      </div>
    </div>
  );
}

export default DayWeather;
