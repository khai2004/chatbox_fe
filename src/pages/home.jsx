import { useDispatch, useSelector } from 'react-redux';
import Sidebar from '../components/sidebar/Sidebar';
import { useGetConversationsQuery } from '../features/chatApiSlice';
import { getConversations, updateMessages } from '../features/chatSlice';
import { useEffect, useRef, useState } from 'react';
import { ChatContainer, ChatHome } from '../components/chat';

import { socket } from '../socket';
import Call from '../components/chat/call/Call';
import {
  getRecieverId,
  getRecieverName,
  getRecieverPicture,
} from '../utils/chatReciever';
import Peer from 'simple-peer';
const callData = {
  socketId: '',
  receivingCall: false,
  callEnded: false,
  name: '',
  otherUser: '',
  picture: '',
  signal: '',
};
const HomePage = () => {
  const { user } = useSelector((state) => state.user);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [typing, setTyping] = useState(null);
  const dispatch = useDispatch();
  const { activeConversation } = useSelector((state) => state.chat);
  const [show, setShow] = useState(false);
  const [call, setCall] = useState(callData);
  const [stream, setStream] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [totalSecInCall, setTotalSecInCall] = useState(0);
  const myVideo = useRef();
  const userVideo = useRef();

  const connectionRef = useRef();

  // join user into the socket io
  useEffect(() => {
    socket.emit('join', user._id);
    //get online users
    socket.on('get-online-users', (users) => {
      setOnlineUsers(users);
    });
  }, [user]);
  //call
  useEffect(() => {
    setupMedia();
    socket.on('setup socket', (id) => {
      setCall({ ...call, socketId: id });
    });
    socket.on('call user', (data) => {
      setCall({
        ...call,
        otherUser: data.from,
        name: data.name,
        picture: data.picture,
        signal: data.signal,
        receivingCall: true,
      });
    });

    socket.on('end call', () => {
      setShow(false);
      setCall({ ...call, callEnded: true, receivingCall: false });
      myVideo.current.srcObject = null;

      setCallAccepted(false);
      connectionRef?.current?.destroy();
    });
  }, []);
  //--call user function
  const callUser = () => {
    enableMedia();
    socket.off('call accepted');
    setCall({
      ...call,
      name: getRecieverName(user, activeConversation.users),
      callEnded: false,
      picture: getRecieverPicture(user, activeConversation.users),
    });

    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });

    peer.on('signal', (data) => {
      socket.emit('call user', {
        userToCall: getRecieverId(user, activeConversation.users),
        signal: data,
        from: user._id,
        name: user.name,
        picture: user.picture,
      });
    });

    peer.on('stream', (stream) => {
      userVideo.current.srcObject = stream;
    });
    socket.on('call accepted', (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });
    connectionRef.current = peer;
  };

  //--answer call function
  const answerCall = () => {
    enableMedia();

    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });

    peer.on('signal', (data) => {
      socket.emit('answer call', { signal: data, to: call.otherUser });
    });

    peer.on('stream', (stream) => {
      userVideo.current.srcObject = stream;
    });

    peer.signal(call.signal);
    connectionRef.current = peer;
  };

  // --end call function
  const endCall = () => {
    setShow(false);
    setCallAccepted(false);
    setCall({ ...call, callEnded: true, receivingCall: false });
    myVideo.current.srcObject = null;
    let anotherUser = activeConversation?.users
      ? getRecieverId(user, activeConversation.users)
      : call.otherUser;
    socket.emit('end call', {
      userId: anotherUser,
    });

    connectionRef.current.destroy();
  };
  //----require to access device from user
  const setupMedia = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
      });
  };

  const enableMedia = () => {
    myVideo.current.srcObject = stream;
    setShow(true);
  };

  //fetch conversation from api
  const { data, error, isLoading } = useGetConversationsQuery(user?.token);

  //--get conversations
  useEffect(() => {
    if (data) {
      dispatch(getConversations(data));
    }
  }, [data, dispatch]);

  //--Handle message received on the receiver side
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
    //--receaving message
    socket.on('received message', handleMessageReceived);

    return () => {
      socket.off('received message', handleMessageReceived);
    };
  }, [dispatch, data]);

  useEffect(() => {
    //listen when a user is typing
    socket.on('typing', (conversation) => setTyping(conversation));
    // listen when a user is not typing
    socket.on('stop typing', () => setTyping(false));
  }, []);
  return (
    <>
      <div className='h-screen dark:bg-dark_bg_1 flex items-center justify-center overflow-hidden'>
        {/* Container */}
        <div
          className='container  py-[19px] h-screen
       flex'
        >
          {/* Sidebar */}
          <Sidebar typing={typing} onlineUsers={onlineUsers} />
          {Object.keys(activeConversation).length ? (
            <ChatContainer
              typing={typing}
              onlineUsers={onlineUsers}
              callUser={callUser}
            />
          ) : (
            <ChatHome />
          )}
        </div>
      </div>
      <div className={(show || call.signal) && !call.callEnded ? '' : 'hidden'}>
        <Call
          call={call}
          setCall={setCall}
          callAccepted={callAccepted}
          myVideo={myVideo}
          userVideo={userVideo}
          stream={stream}
          answerCall={answerCall}
          show={show}
          endCall={endCall}
          totalSecInCall={totalSecInCall}
          setTotalSecInCall={setTotalSecInCall}
        />
      </div>
    </>
  );
};

export default HomePage;
