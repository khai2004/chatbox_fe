import { useEffect, useState } from 'react';
import Ringing from './Ringing';
import Header from './Header';
import CallArea from './CallArea';
import CallAction from './CallAction';

const Call = ({
  call,
  setCall,
  callAccepted,
  myVideo,
  userVideo,
  stream,
  answerCall,
  show,
  endCall,
  totalSecInCall,
  setTotalSecInCall,
}) => {
  const { receivingCall, name, callEnded } = call;
  const [showAction, setShowAction] = useState(false);
  const [toggle, setToggle] = useState(false);
  return (
    <>
      <div
        className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[550px] z-10 rounded-2xl overflow-hidden  callbg ${
          receivingCall && !callAccepted ? 'hidden' : ''
        }`}
        onMouseOver={() => setShowAction(true)}
        onMouseOut={() => setShowAction(false)}
      >
        {/* Container */}
        <div>
          <div>
            {/* Header */}
            <Header />
            {/* Call area */}
            <CallArea
              totalSecInCall={totalSecInCall}
              setTotalSecInCall={setTotalSecInCall}
              name={name}
              callAccepted={callAccepted}
            />
            {/* Call action */}
            {showAction && <CallAction endCall={endCall} />}
          </div>
          {/* Video streams */}
          <div>
            {/* user video */}
            <div>
              {!callEnded && callAccepted && (
                <video
                  ref={userVideo}
                  playsInline
                  muted
                  autoPlay
                  className={toggle ? 'largeVideoCall' : 'SmallVideoCall'}
                ></video>
              )}
            </div>
            {/* my video */}
            <div>
              {stream && (
                <video
                  ref={myVideo}
                  playsInline
                  muted
                  autoPlay
                  className={`${
                    !toggle ? 'largeVideoCall' : 'SmallVideoCall'
                  } ${showAction ? 'moveVideoCall' : ''}`}
                  onClick={() => setToggle((prev) => !prev)}
                ></video>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Ringing */}
      {receivingCall && !callAccepted && (
        <Ringing
          call={call}
          setCall={setCall}
          answerCall={answerCall}
          endCall={endCall}
        />
      )}
      {/*  */}
      {!callAccepted && show ? (
        <audio src='../../../../audio/ringing.mp3' autoPlay loop></audio>
      ) : null}
    </>
  );
};

export default Call;
