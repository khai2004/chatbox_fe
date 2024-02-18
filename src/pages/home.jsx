import { useDispatch, useSelector } from 'react-redux';
import Sidebar from '../components/sidebar/Sidebar';
import { useGetConversationsQuery } from '../features/chatApiSlice';
import { getConversations, updateMessages } from '../features/chatSlice';
import { useEffect } from 'react';
import { ChatContainer, ChatHome } from '../components/chat';

import { socket } from '../socket';

const HomePage = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { activeConversation } = useSelector((state) => state.chat);

  // join user into the socket io
  useEffect(() => {
    socket.emit('join', user._id);
  }, [user]);

  console.log(socket);
  //fetch conversation from api
  const { data, error, isLoading } = useGetConversationsQuery(user?.token);

  //get conversations
  useEffect(() => {
    if (data) {
      dispatch(getConversations(data));
    }
  }, [data, dispatch]);

  //Handle message received on the receiver side
  useEffect(() => {
    const handleMessageReceived = (message) => {
      dispatch(updateMessages([message]));
      if (data) {
        let newConver = data.map((c) => {
          if (c._id === message.conversation._id) {
            return { ...c, latestMessage: message };
          }
          return c;
        });
        dispatch(getConversations(newConver));
      }
    };

    socket.on('received message', handleMessageReceived);

    return () => {
      socket.off('received message', handleMessageReceived);
    };
  }, [dispatch, data]);

  return (
    <div className='h-screen dark:bg-dark_bg_1 flex items-center justify-center overflow-hidden'>
      {/* Container */}
      <div
        className='container  py-[19px] h-screen
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
