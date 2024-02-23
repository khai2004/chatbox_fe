import { useRef } from 'react';
import { PhotoIcon } from '../../../../../svg';
import { useDispatch } from 'react-redux';
import { addFiles } from '../../../../../features/chatSlice';
import { getFileType } from '../../../../../utils/file';

const PhotoAttachment = () => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const imageHanlder = (e) => {
    let files = Array.from(e.target.files);
    files.forEach((file) => {
      if (
        file.type !== 'image/png' &&
        file.type !== 'image/jpeg' &&
        file.type !== 'image/gif' &&
        file.type !== 'image/webp' &&
        file.type !== 'video/mp4' &&
        file.type !== 'video/mpeg' &&
        file.type !== 'image/webm'
      ) {
        files.filter((item) => item.name !== file.name);
        return;
      } else if (file.size > 1024 * 1024 * 5) {
        files.filter((item) => item.name !== file.name);
        return;
      } else {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
          dispatch(
            addFiles({
              file: file,
              fileData: e.target.result,
              type: getFileType(file.type),
            })
          );
        };
      }
    });
  };
  return (
    <li>
      <button
        type='button'
        className='bg-orange-400 rounded-full'
        onClick={() => inputRef.current.click()}
      >
        <PhotoIcon />
      </button>
      <input
        type='file'
        ref={inputRef}
        hidden
        accept='image/png,image/jpeg,image/gif,image/webp'
        multiple
        onChange={imageHanlder}
      />
    </li>
  );
};

export default PhotoAttachment;
