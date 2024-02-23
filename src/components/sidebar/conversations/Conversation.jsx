import { useDispatch, useSelector } from 'react-redux';
import { dateHandler } from '../../../utils/date';
import {
  getRecieverId,
  getRecieverName,
  getRecieverPicture,
} from '../../../utils/chatReciever';
import { useCreate_open_conversationsMutation } from '../../../features/chatApiSlice';
import {
  getConversations,
  setActiveConversation,
} from '../../../features/chatSlice';
import { capitalize } from '../../../utils/string';
import { socket } from '../../../socket';
import { useEffect } from 'react';
import { BeatLoader } from 'react-spinners';

const Conversation = ({ conver, online, typing }) => {
  //data
  const { user } = useSelector((state) => state.user);
  const data = {
    receiver_id: getRecieverId(user, conver.users),
    isGroup: conver.isGroup ? conver._id : false,
    token: user.token,
  };
  const { activeConversation, conversations } = useSelector(
    (state) => state.chat
  );

  //function
  const dispatch = useDispatch();
  const [open_create_conversation, { isLoading }] =
    useCreate_open_conversationsMutation();

  const handleConversation = async () => {
    try {
      const res = await open_create_conversation(data);
      let temp = conversations.filter((active) => active._id !== res.data._id);
      dispatch(getConversations([res.data, ...temp]));
      dispatch(setActiveConversation(res.data));
      socket.emit('join conversation', res.data._id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <li
      onClick={handleConversation}
      className={`list-none h-[72px] w-full dark:bg-dark_bg_1 
      hover:${activeConversation._id === conver._id ? '' : 'dark:bg-dark_bg_2'}
       cursor-pointer dark:text-dark_text_1 px-[10px]
      ${activeConversation._id === conver._id ? 'dark:bg-dark_hover_1' : ''}
      `}
    >
      {/* Container */}
      <div className='relative w-full flex items-center justify-between py-[10px]'>
        {/* Left */}
        <div className='flex items-center gap-x-3'>
          {/* Conversation user picture */}
          <div
            className={`relative min-w-[50px] max-w-[50px] h-[50px] rounded-full overflow-hidden ${
              online ? 'online' : ''
            }`}
          >
            <img
              src={
                conver.isGroup
                  ? conver.picture
                  : getRecieverPicture(user, conver.users)
              }
              alt={conver.name}
              className='w-full h-full object-cover'
            />
          </div>
          {/* Conversation name and message */}
          <div className='w-full flex flex-col'>
            {/* Conversation name */}
            <h1 className='font-bold flex items-center gap-x-2'>
              {capitalize(
                conver.isGroup
                  ? conver.name
                  : getRecieverName(user, conver.users)
              )}
            </h1>
            {/* Conversation message */}
            <div>
              <div className='flex items-center gap-x-1 dark:text-dark_text_2'>
                <div className='flex-1 items-center gap-x-1 dark:text-dark_text_2'>
                  {typing === conver._id ? (
                    <BeatLoader color='#4ade80' size={12} />
                  ) : (
                    <p>
                      {conver.latestMessage?.message.length > 25
                        ? `${conver.latestMessage?.message.substring(0, 25)}...`
                        : conver.latestMessage?.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Right */}
        <div className='flex flex-col gap-y-4 items-end text-xs'>
          <span className='dark:text-dark_text_2'>
            {conver.latestMessage?.createdAt
              ? dateHandler(conver.latestMessage?.createdAt)
              : ''}
          </span>
        </div>
      </div>
      {/* Border */}
      <div className='ml-16 border-b dark:border-b-dark_border_1'></div>
    </li>
  );
};

export default Conversation;
