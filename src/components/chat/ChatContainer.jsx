import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { useGetMessagesQuery } from '../../features/messagesApiSlice';
import { getMessages } from '../../features/chatSlice';

import { ChatHeader } from './header';
import { ChatMessages } from './messages';
import { ChatActions } from './actions';
import { checkOnlineStatus } from '../../utils/chatReciever';
import FilesPreview from './preview/files/FilesPreview';

const ChatContainer = ({ typing, callUser, onlineUsers }) => {
  const dispatch = useDispatch();
  const { activeConversation, files } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user);
  const { data, error, isLoading } = useGetMessagesQuery(
    { converId: activeConversation._id, token: user.token },
    { skip: !activeConversation?._id || !user.token }
  );
  console.log(activeConversation);
  useEffect(() => {
    if (data) {
      dispatch(getMessages(data));
      console.log(data);
    }
  }, [data, dispatch]);
  return (
    <div className='relative w-full h-full border-l dark:border-l-dark_border_2 select-none overflow-hidden'>
      {/* Container */}
      <div>
        {/* Chat header */}
        <ChatHeader
          callUser={callUser}
          online={
            activeConversation.isGroup
              ? false
              : checkOnlineStatus(onlineUsers, user, activeConversation.users)
          }
        />
        {/* Chat messages */}

        {files.length > 0 ? (
          <FilesPreview />
        ) : (
          <>
            <ChatMessages typing={typing} />
            {/* Chat actions */}
            <ChatActions />
          </>
        )}
      </div>
    </div>
  );
};

export default ChatContainer;
