import { useDispatch, useSelector } from 'react-redux';
import { useCreate_open_conversationsMutation } from '../../../features/chatApiSlice';
import { setActiveConversation } from '../../../features/chatSlice';

const Contact = ({ contact, setSearchResuts }) => {
  const { user } = useSelector((state) => state.user);
  //function
  const dispatch = useDispatch();

  const [open_create_conversation, { isLoading }] =
    useCreate_open_conversationsMutation();

  const data = { receiver_id: contact._id, token: user.token };
  const handleConversation = async () => {
    try {
      const res = await open_create_conversation(data);
      dispatch(setActiveConversation(res.data));
      setSearchResuts((c) => c.filter((e) => e._id !== contact._id));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <li
      className='list-none h-[72px] hover:dark:bg-dark_bg_2 cursor-pointer dark:text-dark_text_1 px-[10px]'
      onClick={handleConversation}
    >
      {/* Container */}
      <div className='flex items-center gap-x-3 py-[10px]'>
        <div className='flex items-center gap-x-3'>
          {/* contact user picture */}
          <div className='relative min-w-[50px] max-w-[50px]  h-[50px] rounded-full overflow-hidden'>
            <img
              src={contact.picture}
              alt={contact.name}
              className='w-full h-full object-cover'
            />
          </div>
          {/* contact name and message */}
          <div className='w-full flex flex-col'>
            {/* contact name */}
            <h1 className='font-bold flex items-center gap-x-2'>
              {contact.name}
            </h1>
            {/* contact status */}
            <div>
              <div className='flex items-center gap-x-1 dark:text-dark_text_2'>
                <div className='flex-1 items-center gap-x-1 dark:text-dark_text_2'>
                  <p>{contact.status}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default Contact;
