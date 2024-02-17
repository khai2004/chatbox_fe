import { useEffect, useState } from 'react';
import ReturnIcon from '../../../svg/Return';
import SearchIcon from '../../../svg/Search';
import FilterIcon from '../../../svg/FilterIcon';
import { useSearchUserQuery } from '../../../features/userApiSlice';
import { useSelector } from 'react-redux';

const Search = ({ searchLength, setSearchResuts }) => {
  const { user } = useSelector((state) => state.user);
  const [show, setShow] = useState(false);
  const [keyword, setKeyword] = useState('');

  const handleSearch = (e) => {
    if (e.target.value && e.key === 'Enter') {
      setKeyword(e.target.value);
    }
  };

  const { data, error, status } = useSearchUserQuery(
    { keyword: keyword, token: user.token },
    {
      skip: keyword === '' || !user?.token,
    }
  );
  const handleCloseSearch = () => {
    setKeyword('');
    setSearchResuts([]);
    setShow(false);
  };
  useEffect(() => {
    setSearchResuts(data);
  }, [data, setSearchResuts]);
  return (
    <div className='h-[49px] py-1.5'>
      {/* COntainer */}
      <div className='px-[10px]'>
        {/* Search input container */}
        <div className='flex items-center gap-x-2'>
          <div className='w-full flex dark:bg-dark_bg_2 rounded-lg pl-2'>
            {show || searchLength > 0 ? (
              <span
                className='w-8 flex items-center justify-center rotateAnimation cursor-pointer'
                onClick={handleCloseSearch}
              >
                <ReturnIcon className='fill-green_1 w-5' />
              </span>
            ) : (
              <span
                className='w-8 flex items-center justify-center cursor-pointer'
                onClick={() => setShow(true)}
              >
                <SearchIcon className='dark:fill-dark_svg_2 w-5' />
              </span>
            )}
            <input
              type='text'
              placeholder='Search or start a new chat'
              className='input'
              onFocus={() => setShow(true)}
              onBlur={() => searchLength === 0 && setShow(false)}
              onKeyDown={(e) => handleSearch(e)}
            />
          </div>
          <button className='btn'>
            <FilterIcon className='dark:fill-dark_svg_2' />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Search;
