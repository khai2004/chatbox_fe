import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { useGetMessagesQuery } from '../../features/messagesApiSlice';
import { getMessages } from '../../features/chatSlice';

import { ChatHeader } from './header';
import { ChatMessages } from './messages';
import { ChatActions } from './actions';

const ChatContainer = () => {
  const dispatch = useDispatch();
  const { activeConversation } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user);
  const { data, error, isLoading } = useGetMessagesQuery(
    { converId: activeConversation._id, token: user.token },
    { skip: !activeConversation?._id || !user.token }
  );

  useEffect(() => {
    if (data) {
      dispatch(getMessages(data));
    }
  }, [data, dispatch]);
  return (
    <div className='relative w-full h-full border-l dark:border-l-dark_border_2 select-none overflow-hidden'>
      {/* Container */}
      <div>
        {/* Chat header */}
        <ChatHeader />
        {/* Chat messages */}
        <ChatMessages />
        {/* Chat actions */}
        <ChatActions />
      </div>
    </div>
  );
};

export default ChatContainer;
