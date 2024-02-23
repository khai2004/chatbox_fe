import { useSelector } from 'react-redux';
import Message from './Message';
import { useEffect, useRef } from 'react';
import Typing from './Typing';
import FileMessage from './files/FileMessage';

const ChatMessages = ({ typing }) => {
  const { messages, activeConversation } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user);
  const lastMessageRef = useRef();
  useEffect(() => {
    lastMessageRef.current.scrollIntoView({
      behavior: 'smooth',
    });
  }, [messages]);
  return (
    <div className='mb-[60px]'>
      {/* Container */}
      <div className='scrollbar overflow_scrollbar overflow-auto py-2 px-[4%]'>
        {/* Messages*/}
        {messages &&
          messages?.map((message, index) => (
            <>
              {/* Message files */}
              {message.files.length > 0 &&
                message.files.map((file) => (
                  <FileMessage
                    fileMessage={file}
                    message={message}
                    key={index}
                    me={user?._id === message.sender._id}
                  />
                ))}
              {message.message.length > 0 ? (
                <Message
                  message={message}
                  key={index}
                  me={user?._id === message.sender._id}
                />
              ) : (
                ''
              )}
            </>
          ))}
        {typing === activeConversation._id && <Typing />}
        <div ref={lastMessageRef} className='m-2'></div>
      </div>
    </div>
  );
};

export default ChatMessages;
