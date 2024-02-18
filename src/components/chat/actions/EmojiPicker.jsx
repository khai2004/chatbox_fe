import EmojiPicker from 'emoji-picker-react';
import EmojiIcon from '../../../svg/Emoji';
import { useEffect, useState } from 'react';

const EmojiPickerComponent = ({
  textRef,
  message,
  setMessage,
  showEmojiPicker,
  setShowEmojiPicker,
  setShowAttachment,
}) => {
  const [cursorPosition, setCursorPosition] = useState();
  useEffect(() => {
    textRef.current.selectionEnd = cursorPosition;
  }, [cursorPosition, textRef]);
  const handleEmoji = (emojiData) => {
    const { emoji } = emojiData;
    const ref = textRef.current;
    ref.focus();
    const start = message.substring(0, ref.selectionStart);
    const end = message.substring(ref.selectionStart);
    const newText = start + emoji + end;
    setMessage(newText);
    setCursorPosition(start.length + emoji.length);
  };

  const handleOpenEmoji = () => {
    setShowEmojiPicker((pre) => !pre);
    setShowAttachment(false);
  };
  return (
    <li>
      <button className='btn' type='button' onClick={handleOpenEmoji}>
        <EmojiIcon className='dark:fill-dark_svg_1' />
      </button>
      {showEmojiPicker && (
        <div className='openEmojiAnimation absolute bottom-[60px] left-[-0.5px] w-full'>
          <EmojiPicker
            theme='dark'
            width='100%'
            style={{}}
            onEmojiClick={handleEmoji}
          />
        </div>
      )}
    </li>
  );
};

export default EmojiPickerComponent;
