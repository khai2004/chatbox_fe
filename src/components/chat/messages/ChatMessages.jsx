import { useSelector } from 'react-redux';
import Message from './Message';

const ChatMessages = () => {
  const { messages } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user);

  return (
    <div className='mb-[60px]'>
      {/* Container */}
      <div className='scrollbar overflow_scrollbar overflow-auto py-2 px-[4%]'>
        {/* Messages*/}
        {messages &&
          messages?.map((message) => (
            <Message
              message={message}
              key={message._id}
              me={user?._id === message.sender._id}
            />
          ))}
      </div>
    </div>
  );
};

export default ChatMessages;
