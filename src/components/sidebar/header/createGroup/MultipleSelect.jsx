import React from 'react';
import Select from 'react-select';

const MultipleSelect = ({
  selectedUsers,
  searchResults,
  setSelectedUsers,
  handleSearch,
}) => {
  return (
    <div className='mt-4'>
      <Select
        options={searchResults}
        onChange={setSelectedUsers}
        onKeyDown={(e) => handleSearch(e)}
        placeholder='Search, select users'
        isMulti
        formatOptionLabel={(user) => (
          <div className='flex items-center gap-1'>
            <img
              src={user.picture}
              alt=''
              className='w-8 h-8 object-cover rounded-full'
            />
            <span className='text-[#222]'>{user.label}</span>
          </div>
        )}
        styles={{
          control: (baseStyle, state) => ({
            ...baseStyle,
            border: 'none',
            borderColor: 'transparent',
            background: 'transparent',
          }),
        }}
      />
    </div>
  );
};

export default MultipleSelect;
