import { useDispatch, useSelector } from 'react-redux';
import Add from './Add';
import { CloseIcon, SendIcon } from '../../../../svg';
import { uploadFiles } from '../../../../utils/uploadFiles';
import { useSendMessageMutation } from '../../../../features/messagesApiSlice';
import { PulseLoader } from 'react-spinners';
import { socket } from '../../../../socket';
import { clearFiles, removeFile } from '../../../../features/chatSlice';
import VideoThumbnail from 'react-video-thumbnail';

const HandleAndSend = ({
  activeIndex,
  setActiveIndex,
  message,
  setMessage,
}) => {
  const { files, activeConversation } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [sendMessage, { isLoading }] = useSendMessageMutation();

  const sendMessageHandler = async (e) => {
    e.preventDefault();
    //upload file first
    const upload_files = await uploadFiles(files);

    const data = {
      token: user.token,
      message: message,
      conve_id: activeConversation._id,
      files: upload_files.length > 0 ? upload_files : [],
    };

    // Send message
    let newMessage = await sendMessage(data);
    console.log(newMessage);
    socket.emit('send message', newMessage.data);
    setMessage('');
    dispatch(clearFiles());
  };

  const handleRemoveFile = (index) => {
    dispatch(removeFile(index));
  };
  return (
    <div className=' w-[97%] flex items-center justify-between mt-2 border-t dark:border-dark_border_2'>
      {/* Empty */}
      <span></span>
      {/* List files */}
      <div className='flex items-center gap-x-2'>
        {files.map((file, i) => (
          <div
            onClick={() => setActiveIndex(i)}
            key={i}
            className={`w-14 h-14 border dark:border-white mt-2 rounded-md overflow-hidden cursor-pointer relative fileThumbnail ${
              activeIndex === i ? 'border-[3px] !border-green_1' : ''
            } `}
          >
            {file.type === 'IMAGE' ? (
              <img
                src={file.fileData}
                alt=''
                className='w-full h-full object-cover'
              />
            ) : file.type === 'VIDEO' ? (
              <VideoThumbnail videoUrl={file.fileData} />
            ) : (
              <img
                src={`../../../../images/file/${files[0].type}.png`}
                alt={files[0].type}
                className='w-8 h-10 ml-2.5'
              />
            )}
            {/* Remove file */}
            <div
              className='removeFileIcon hidden'
              onClick={() => {
                handleRemoveFile(i);
              }}
            >
              <CloseIcon className='dark:fill-dark_svg_1 absolute right-1 top-1 w-4 h-4' />
            </div>
          </div>
        ))}
        {/* Add another file */}
        <Add setActiveIndex={setActiveIndex} />
      </div>
      {/* Send button */}
      <div
        className='bg-green_1 w-16 h-16 mt-2 rounded-full flex items-center justify-center cursor-pointer'
        onClick={sendMessageHandler}
      >
        {isLoading ? <PulseLoader /> : <SendIcon className='fill-white' />}
      </div>
    </div>
  );
};

export default HandleAndSend;
