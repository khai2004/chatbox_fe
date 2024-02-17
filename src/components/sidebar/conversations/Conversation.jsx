import { useDispatch, useSelector } from 'react-redux';
import { dateHandler } from '../../../utils/date';
import { getRecieverId } from '../../../utils/chatReciever';
import { useCreate_open_conversationsMutation } from '../../../features/chatApiSlice';
import { setActiveConversation } from '../../../features/chatSlice';
import { capitalize } from '../../../utils/string';

const Conversation = ({ conver }) => {
  //data
  const { user } = useSelector((state) => state.user);
  const recieverId = getRecieverId(user, conver.users);
  const data = { receiver_id: recieverId, token: user.token };

  //function
  const dispatch = useDispatch();
  const [open_create_conversation, { isLoading }] =
    useCreate_open_conversationsMutation();
  const handleConversation = async () => {
    try {
      const res = await open_create_conversation(data);
      dispatch(setActiveConversation(res.data));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <li
      className='list-none h-[72px] w-full dark:bg-dark_bg_1 hover:dark:bg-dark_bg_2 cursor-pointer dark:text-dark_text_1 px-[10px]'
      onClick={handleConversation}
    >
      {/* Container */}
      <div className='relative w-full flex items-center justify-between py-[10px]'>
        {/* Left */}
        <div className='flex items-center gap-x-3'>
          {/* Conversation user picture */}
          <div className='relative min-w-[50px] max-w-[50px]  h-[50px] rounded-full overflow-hidden'>
            <img
              src={conver.picture}
              alt={conver.name}
              className='w-full h-full object-cover'
            />
          </div>
          {/* Conversation name and message */}
          <div className='w-full flex flex-col'>
            {/* Conversation name */}
            <h1 className='font-bold flex items-center gap-x-2'>
              {capitalize(conver.name)}
            </h1>
            {/* Conversation message */}
            <div>
              <div className='flex items-center gap-x-1 dark:text-dark_text_2'>
                <div className='flex-1 items-center gap-x-1 dark:text-dark_text_2'>
                  <p>
                    {conver.latestMessage?.message.length > 25
                      ? `${conver.latestMessage?.message.substring(0, 25)}...`
                      : conver.latestMessage?.message}
                  </p>
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