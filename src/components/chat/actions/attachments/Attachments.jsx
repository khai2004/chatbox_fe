import { useState } from 'react';
import { AttachmentIcon } from '../../../../svg';
import Menu from './Menu';

const Attachments = () => {
  const [show, setShow] = useState(false);
  return (
    <li>
      <button
        className='btn'
        type='button'
        onClick={() => setShow((pre) => !pre)}
      >
        <AttachmentIcon className='dark:fill-dark_svg_1' />
      </button>
      {/* Menu */}
      {show && <Menu />}
    </li>
  );
};

export default Attachments;
