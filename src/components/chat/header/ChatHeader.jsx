import { useSelector } from 'react-redux';
import SearchLargeIcon from '../../../svg/SearchLarge';
import DotsIcon from '../../../svg/Dots';
import { capitalize } from '../../../utils/string';
import {
  getRecieverName,
  getRecieverPicture,
} from '../../../utils/chatReciever';
import { CallIcon, VideoCallIcon } from '../../../svg';

const ChatHeader = ({ online, callUser }) => {
  const { activeConversation } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user);

  return (
    <div className='h-[59px] dark:bg-dark_bg_2 flex items-center px-4 select-none'>
      {/* Container */}
      <div className='w-full flex items-center justify-between'>
        {/* Left */}
        <div className='flex items-center gap-x-4'>
          {/* Conversation image */}
          <button className='btn'>
            <img
              src={
                activeConversation.isGroup
                  ? activeConversation.picture
                  : getRecieverPicture(user, activeConversation.users)
              }
              alt={`${
                activeConversation.isGroup
                  ? activeConversation.name
                  : getRecieverName(user, activeConversation.users)
              } `}
              className='w-full h-full rounded-full object-cover'
            />
          </button>
          {/* Conversation name and online status */}
          <div className='flex flex-col'>
            <h1 className='dark:text-white text-lg font-bold'>
              {capitalize(
                (activeConversation.isGroup
                  ? activeConversation.name
                  : getRecieverName(user, activeConversation.users)
                ).split(' ')[0]
              )}
            </h1>
            <span className='text-xs dark:text-dark_svg_2'>
              {online ? 'online' : null}
            </span>
          </div>
        </div>
        {/* Right */}
        <ul className='flex items-center gap-x-2.5'>
          {online && (
            <li onClick={() => callUser()}>
              <button className='btn'>
                <VideoCallIcon />
              </button>
            </li>
          )}
          {online && (
            <li onClick={() => callUser()}>
              <button className='btn'>
                <CallIcon />
              </button>
            </li>
          )}
          <li>
            <button className='btn'>
              <SearchLargeIcon className='dark:fill-dark_svg_1' />
            </button>
          </li>
          <li>
            <button className='btn'>
              <DotsIcon className='dark:fill-dark_svg_1' />
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ChatHeader;
