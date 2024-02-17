import { useSelector } from 'react-redux';
import Conversation from './Conversation';

const Conversations = () => {
  const { conversations } = useSelector((state) => state.chat);
  return (
    <div className='conver scrollbar'>
      <ul>
        {conversations &&
          conversations.map((conver) => (
            <Conversation conver={conver} key={conver._id} />
          ))}
      </ul>
    </div>
  );
};

export default Conversations;
