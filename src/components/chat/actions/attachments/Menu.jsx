import {
  CameraIcon,
  ContactIcon,
  DocumentIcon,
  PhotoIcon,
  PollIcon,
  StickerIcon,
} from '../../../../svg';

function Menu() {
  return (
    <ul className='absolute bottom-14 openEmojiAnimation'>
      <li>
        <button type='button' className='rounded-full'>
          <PollIcon />
        </button>
      </li>
      <li>
        <button type='button' className='bg-slate-500 rounded-full'>
          <ContactIcon />
        </button>
      </li>
      <li>
        <button type='button' className='bg-blue-500 rounded-full'>
          <DocumentIcon />
        </button>
      </li>
      <li>
        <button type='button' className='bg-red-500 rounded-full'>
          <CameraIcon />
        </button>
      </li>
      <li>
        <button type='button' className='rounded-full'>
          <StickerIcon />
        </button>
      </li>
      <li>
        <button type='button' className='bg-orange-400 rounded-full'>
          <PhotoIcon />
        </button>
      </li>
    </ul>
  );
}

export default Menu;
