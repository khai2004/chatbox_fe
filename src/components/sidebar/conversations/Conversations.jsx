import { useSelector } from 'react-redux';
import Conversation from './Conversation';
import { getRecieverId } from '../../../utils/chatReciever';

const Conversations = ({ typing, onlineUsers }) => {
  const { conversations, activeConversation } = useSelector(
    (state) => state.chat
  );
  const { user } = useSelector((state) => state.user);
  return (
    <div className='conver scrollbar'>
      <ul>
        {conversations &&
          conversations
            .filter(
              (c) =>
                c.latestMessage ||
                c._id === activeConversation ||
                c.isGroup === true
            )
            .map((conver) => {
              let check = onlineUsers.find(
                (u) => u.userId === getRecieverId(user, conver.users)
              );
              return (
                <Conversation
                  typing={typing}
                  conver={conver}
                  key={conver._id}
                  online={!conver.isGroup && check}
                />
              );
            })}
      </ul>
    </div>
  );
};

export default Conversations;
