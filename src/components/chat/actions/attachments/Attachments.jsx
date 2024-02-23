import { useState } from 'react';
import { AttachmentIcon } from '../../../../svg';
import Menu from './menu/Menu';

const Attachments = ({
  showAttachment,
  setShowAttachment,
  setShowEmojiPicker,
}) => {
  const handelOpenAttachment = () => {
    setShowAttachment((pre) => !pre);
    setShowEmojiPicker(false);
  };
  return (
    <li>
      <button className='btn' type='button' onClick={handelOpenAttachment}>
        <AttachmentIcon className='dark:fill-dark_svg_1' />
      </button>
      {/* Menu */}
      {showAttachment && <Menu />}
    </li>
  );
};

export default Attachments;
