import moment from 'moment';
import { TriangleIcon } from '../../../svg';

const Message = ({ message, me }) => {
  return (
    <div
      className={`w-full flex mt-2 space-x-3  ${
        me ? 'ml-auto justify-end' : ''
      }`}
    >
      {/* Message Container */}
      <div>
        <div
          className={`relative h-full max-w-xs dark:text-dark_text_1 p-2 rounded-lg ${
            me ? 'bg-green_3' : 'dark:bg-dark_bg_2'
          }`}
        >
          {/* Message */}
          <p className='float-left h-full text-sm pb-5'>{message.message}</p>
          {/* Message Date */}
          <span className='float-right text-xs pt-6 text-dark_text_5'>
            {moment(message.createdAt).format('HH:mm')}
          </span>
          {/* Triangle Icon */}
          <span>
            {!me && (
              <TriangleIcon className='dark:fill-dark_bg_2 rotate-[60deg] absolute top-[-5px] -left-1.5' />
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Message;
