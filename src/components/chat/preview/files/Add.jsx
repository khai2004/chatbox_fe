import { useRef } from 'react';
import { addFiles } from '../../../../features/chatSlice';
import { getFileType } from '../../../../utils/file';
import { useDispatch } from 'react-redux';
import { CloseIcon } from '../../../../svg';

const Add = () => {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const addFileHanlder = (e) => {
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
        file.type !== 'audio/wav' &&
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
              fileData:
                getFileType(file.type) === 'IMAGE' ? e.target.result : '',
              type: getFileType(file.type),
            })
          );
        };
      }
    });
  };

  return (
    <>
      <div
        className='w-14 mt-2 h-14 border dark:border-white rounded-md flex items-center justify-center cursor-pointer'
        onClick={() => inputRef.current.click()}
      >
        <span className='rotate-45'>
          <CloseIcon className='dark:fill-dark_svg_1' />
        </span>
      </div>
      <input
        type='file'
        ref={inputRef}
        hidden
        multiple
        accept='application/*,text/plain,image/png,image/jpeg,image/gif,image/webp'
        onChange={addFileHanlder}
      />
    </>
  );
};

export default Add;
