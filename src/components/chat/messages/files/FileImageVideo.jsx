const FileImageVideo = ({ url, type }) => {
  return (
    <div className='cursor-pointer'>
      {type === 'IMAGE' ? (
        <img src={url} alt='' />
      ) : (
        <video src={url} controls></video>
      )}
    </div>
  );
};

export default FileImageVideo;
