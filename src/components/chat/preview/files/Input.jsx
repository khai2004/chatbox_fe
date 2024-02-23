const Input = ({ message, setMessage }) => {
  return (
    <div className='w-full max-w-[60%] dark:bg-dark_hover_1 rounded-lg'>
      {/* Message input */}
      <input
        type='text'
        placeholder='Type a message'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className='w-full bg-transparent h-11 pl-2 focus:outline-none border-none bg-dark_text_1'
      />
    </div>
  );
};

export default Input;
