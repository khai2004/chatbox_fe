import { DownloadIcon } from '../../../../svg';

const FileOthers = ({ file, type }) => {
  return (
    <div className='bg-green_4 p-2'>
      {/* Container*/}
      <div className='flex justify-between px-8 cursor-pointer'>
        <img
          src={`../../../../images/${type}.png`}
          alt=''
          className='w-8 object-contain'
        />
        <div className='flex flex-col gap-2'>
          <h1>
            {file.original_filename}
            {file.public_id.split('/'[1])}
          </h1>
          <span className='text-sm'>
            {type} . {file.bytes}B
          </span>
        </div>

        {/* Download button */}
        <a href={file.secure_url} target='_blank' download rel='noreferrer'>
          <DownloadIcon />
        </a>
      </div>
    </div>
  );
};

export default FileOthers;
