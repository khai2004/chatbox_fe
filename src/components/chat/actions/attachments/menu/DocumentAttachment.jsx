import { useDispatch } from 'react-redux';
import { addFiles } from '../../../../../features/chatSlice';
import { StickerIcon } from '../../../../../svg';
import { useRef } from 'react';
import { getFileType } from '../../../../../utils/file';

const DocumentAttachment = () => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const documentHanlder = (e) => {
    let files = Array.from(e.target.files);
    files.forEach((file) => {
      if (
        file.type !== 'application/pdf' &&
        file.type !== 'text/plain' &&
        file.type !== 'application/msword' &&
        file.type !==
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document' &&
        file.type !== 'application/vnd.ms-powerpoint' &&
        file.type !==
          'application/vnd.openxmlformats-officedocument.presentationml.presentation' &&
        file.type !== 'application/vnd.ms-excel' &&
        file.type !==
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' &&
        file.type !== 'application/vnd.rar' &&
        file.type !== 'application/zip' &&
        file.type !== 'audio/mpeg' &&
        file.type !== 'audio/wav'
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
        className='rounded-full'
        onClick={() => inputRef.current.click()}
      >
        <StickerIcon />
      </button>
      <input
        type='file'
        ref={inputRef}
        hidden
        multiple
        accept='application/*,text/plain'
        onChange={documentHanlder}
      />
    </li>
  );
};

export default DocumentAttachment;
