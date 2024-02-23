import { useState } from 'react';
import { socket } from '../../../socket';
import { useSelector } from 'react-redux';

const Input = ({ message, setMessage, textRef }) => {
  const [typing, setTyping] = useState(false);
  const { activeConversation } = useSelector((state) => state.chat);

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
    if (!typing) {
      setTyping(true);
      socket.emit('typing', activeConversation._id);
    }

    let lastTypingTime = new Date().getTime();
    let timer = 2000;
    setTimeout(() => {
      let timeNow = new Date().getTime();
      let timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timer && typing) {
        socket.emit('stop typing', activeConversation._id);
        setTyping(false);
      }
    }, timer);
  };
  return (
    <div className='w-full'>
      <input
        type='text'
        className='dark:bg-dark_hover_1 dark:text-dark_text_1 outline-none h-[45px] w-full flex-1 rounded-lg px-4'
        placeholder='Type a nessage'
        value={message}
        onChange={(e) => handleMessageChange(e)}
        ref={textRef}
      />
    </div>
  );
};

export default Input;
