import { useRef, useState } from 'react';

const Picture = ({ readablePicture, setRedablePicture, setPicture }) => {
  const [error, setError] = useState('');
  const inputRef = useRef();
  const handlePicture = (e) => {
    let pic = e.target.files[0];
    if (
      pic.type !== 'image/jpeg' &&
      pic.type !== 'image/png' &&
      pic.type !== 'image/webp'
    ) {
      setError(`${pic.name} format is not supported.`);
      return;
    } else if (pic.size > 1024 * 1024 * 5) {
      setError(`${pic.name} is too large, maximum 5mb allowed.`);
      return;
    } else {
      setError('');
      setPicture(pic);

      const reader = new FileReader();
      reader.readAsDataURL(pic);
      reader.onload = (e) => {
        setRedablePicture(e.target.result);
      };
    }
  };

  const handleChangePic = () => {
    setPicture('');
    setRedablePicture('');
  };

  return (
    <div className='mt-8 content-center dark:text-dark_text_1 space-y-1'>
      <label htmlFor='picture' className='text-sm font-bold tracking-wide'>
        Picture (Optional)
      </label>
      {readablePicture ? (
        <div>
          <img
            src={readablePicture}
            alt=''
            className='w-20 h-20  object-cover rounded-full'
          />
          {/* Change pic */}
          <div
            className='mt-2 w-20 py-1 dark:bg-dark_bg_3 rounded-md text-xs font-bold flex items-center justify-center'
            onClick={handleChangePic}
          >
            Remove
          </div>
        </div>
      ) : (
        <div
          className='w-full h-12 dark:bg-dark_bg_3 rounded-md font-bold flex items-center justify-center cursor-pointer'
          onClick={() => inputRef.current.click()}
        >
          Upload picture
        </div>
      )}
      <input
        type='file'
        name='picture'
        id='picture'
        hidden
        ref={inputRef}
        accept='image/png,image/jpeg,image/webp'
        onChange={handlePicture}
      />

      {/* Error */}
      <div className='mt-2'>
        {error && <p className='text-red-400'>{error}</p>}
      </div>
    </div>
  );
};

export default Picture;
