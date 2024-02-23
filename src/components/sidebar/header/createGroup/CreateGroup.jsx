import { useEffect, useState } from 'react';
import { ReturnIcon, ValidIcon } from '../../../../svg';
import UnderlineInput from './UnderlineInput';
import MultipleSelect from './MultipleSelect';
import { useSelector } from 'react-redux';
import { useSearchUserQuery } from '../../../../features/userApiSlice';
import { ClipLoader } from 'react-spinners';
import { useCreateGroupMutation } from '../../../../features/chatApiSlice';

const CreateGroup = ({ setShowCreateGroup }) => {
  const [name, setName] = useState('');
  const { user } = useSelector((state) => state.user);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [userKey, setUserKey] = useState('');
  const handleSearch = (e) => {
    setSearchResults([]);
    if (e.target.value && e.key === 'Enter') {
      setUserKey(e.target.value);
    }
  };
  console.log(user._id);
  const { data, error, status } = useSearchUserQuery(
    { keyword: userKey, token: user.token },
    {
      skip: userKey === '' || !user?.token,
    }
  );
  useEffect(() => {
    let tempArray = [];
    data?.forEach((user) => {
      let temp = {
        value: user._id,
        label: user.name,
        picture: user.picture,
      };
      tempArray.push(temp);
    });
    setSearchResults(tempArray);
  }, [data, setSearchResults]);

  // create group
  // --create group api
  const [createGroup, { isLoading }] = useCreateGroupMutation();

  const createGroupHandler = async () => {
    let users = selectedUsers.map((user) => user.value);

    let data = {
      name: name,
      users: users,
      token: user.token,
    };
    try {
      const res = await createGroup(data);
      console.log(res);
      setShowCreateGroup(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className='createGroupAnimation relative flex0030 h-full z-40'>
      {/* Container */}
      <div className='mt-5'>
        {/* Return/close button */}
        <button
          className='btn w-6 h-6 border'
          onClick={() => setShowCreateGroup(false)}
        >
          <ReturnIcon className='fill-white' />
        </button>

        {/* Group name input */}
        <UnderlineInput name={name} setName={setName} />
        {/* Multiple select */}
        <MultipleSelect
          selectedUsers={selectedUsers}
          searchResults={searchResults}
          setSelectedUsers={setSelectedUsers}
          handleSearch={handleSearch}
        />
        {/* Create group button */}
        <div className='absolute bottom-1/3 left-1/2 -translate-x-1/2 max-h-fit'>
          <button
            className='btn bg-green_1 scale-150 hover:bg-green-500'
            onClick={() => createGroupHandler()}
          >
            {isLoading ? (
              <ClipLoader color='#E9EDEF' size={25} />
            ) : (
              <ValidIcon className='fill-white mt-2 h-full' />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateGroup;
