import { capitalize } from '../../../utils/string';
import CallTine from './CallTine';

const CallArea = ({
  name,
  totalSecInCall,
  setTotalSecInCall,
  callAccepted,
}) => {
  return (
    <div className='absolute z-40 top-12 w-full p-1'>
      {/* Container */}
      <div className='flex flex-col items-center '>
        {/* Call infor */}
        <div className='flex flex-col items-center gap-y-1'>
          <h1 className='text-white text-lg'>
            <b>{name ? capitalize(name) : ''}</b>
          </h1>
          {totalSecInCall === 0 ? (
            <span className='text-dark_text_1'>Ringing...</span>
          ) : null}
          {callAccepted && (
            <CallTine
              totalSecInCall={totalSecInCall}
              setTotalSecInCall={setTotalSecInCall}
              callAccepted={callAccepted}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CallArea;
