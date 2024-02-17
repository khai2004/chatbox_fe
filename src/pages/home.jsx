import { useDispatch, useSelector } from 'react-redux';
import Sidebar from '../components/sidebar/Sidebar';
import { useGetConversationsQuery } from '../features/chatApiSlice';
import { getConversations } from '../features/chatSlice';
import { useEffect } from 'react';
import { ChatContainer, ChatHome } from '../components/chat';

const HomePage = () => {
  const { user } = useSelector((state) => state.user);
  const chat = useSelector((state) => state.chat);
  const dispatch = useDispatch();
  const { activeConversation } = useSelector((state) => state.chat);

  const { data, error, isLoading } = useGetConversationsQuery(user?.token);
  useEffect(() => {
    dispatch(getConversations(data));
  }, [data, dispatch]);
  return (
    <div className='h-screen dark:bg-dark_bg_1 flex items-center justify-center py-[19px] overflow-hidden'>
      {/* Container */}
      <div
        className='container h-screen
       flex'
      >
        {/* Sidebar */}
        <Sidebar />
        {Object.keys(activeConversation).length ? (
          <ChatContainer />
        ) : (
          <ChatHome />
        )}
      </div>
    </div>
  );
};

export default HomePage;
