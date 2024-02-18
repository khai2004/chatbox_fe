import { useRef, useState } from 'react';
import SendIcon from '../../../svg/Send';
import Input from './Input';
import { useDispatch, useSelector } from 'react-redux';
import { useSendMessageMutation } from '../../../features/messagesApiSlice';
import {
  getConversations,
  getMessages,
  updateMessages,
} from '../../../features/chatSlice';
import { ClipLoader } from 'react-spinners';
import EmojiPickerComponent from './EmojiPicker';
import { Attachments } from './attachments';
import { socket } from '../../../socket';

const ChatActions = () => {
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showAttachment, setShowAttachment] = useState(false);

  const textRef = useRef();

  const { activeConversation, conversations } = useSelector(
    (state) => state.chat
  );
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const [sendMessage, { isLoading }] = useSendMessageMutation();

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const data = {
      message: message,
      conve_id: activeConversation?._id,
      files: [],
      token: user.token,
    };
    try {
      if (message && activeConversation?._id) {
        const res = await sendMessage(data);
        socket.emit('send message', res.data);
        dispatch(updateMessages([res.data]));
        const newConver = conversations.map((c) => {
          if (c._id === activeConversation._id) {
            return { ...c, latestMessage: res.data };
          }
          return c;
        });

        dispatch(getConversations(newConver));
        setMessage('');
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form
      onSubmit={handleSendMessage}
      className='dark:bg-dark_bg_2 h-[60px] w-full flex items-center absolute bottom-0 py-2 select-none'
    >
      {/* Container */}
      <div className='w-full flex items-center gap-x-2'>
        {/* Emojis and attachments */}
        <ul className='flex gap-x-2'>
          <EmojiPickerComponent
            message={message}
            setMessage={setMessage}
            textRef={textRef}
            showEmojiPicker={showEmojiPicker}
            setShowEmojiPicker={setShowEmojiPicker}
            setShowAttachment={setShowAttachment}
          />
          <Attachments
            showAttachment={showAttachment}
            setShowAttachment={setShowAttachment}
            setShowEmojiPicker={setShowEmojiPicker}
          />
        </ul>
        {/* Input */}
        <Input message={message} setMessage={setMessage} textRef={textRef} />
        <button className='btn' type='submit'>
          {isLoading ? (
            <ClipLoader color='#E9EDEF' size={25} />
          ) : (
            <SendIcon className='dark:fill-dark_svg_1' />
          )}
        </button>
      </div>
    </form>
  );
};

export default ChatActions;
