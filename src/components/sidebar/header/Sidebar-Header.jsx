import { useSelector } from 'react-redux';
import CommunityIcon from '../../../svg/Community';
import StoryIcon from '../../../svg/Story';
import ChatIcon from '../../../svg/Chat';
import DotsIcon from '../../../svg/Dots';
import { useState } from 'react';
import Menu from './Menu';
import { CreateGroup } from './createGroup';

const SidebarHeader = () => {
  const { user } = useSelector((state) => state.user);
  const [showMenu, setShowMenu] = useState(false);
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  return (
    <>
      {/* Sidebar header */}

      <div className='h-[50px] dark:bg-dark_bg_2 flex items-center px-4'>
        {/* Container */}
        <div className='w-full flex items-center justify-between'>
          {/* user image */}
          <button className='btn '>
            <img
              src={user.picture}
              alt=''
              className='w-full h-full rounded-full object-cover'
            />
          </button>
          {/* user icons */}
          <ul className='flex items-center gap-x-2 '>
            <li>
              <button className='btn'>
                <CommunityIcon className='dark:fill-dark_svg_1' />
              </button>
            </li>{' '}
            <li>
              <button className='btn'>
                <StoryIcon className='dark:fill-dark_svg_1' />
              </button>
            </li>{' '}
            <li>
              <button className='btn'>
                <ChatIcon className='dark:fill-dark_svg_1' />
              </button>
            </li>
            <li className='relative'>
              <button
                className={`btn ${showMenu ? 'bg-dark_hover_1' : ''}`}
                onClick={() => setShowMenu((pre) => !pre)}
              >
                <DotsIcon className='dark:fill-dark_svg_1' />
              </button>
              {showMenu && (
                <Menu
                  setShowMenu={setShowMenu}
                  setShowCreateGroup={setShowCreateGroup}
                />
              )}
            </li>
          </ul>
        </div>
      </div>
      {showCreateGroup && (
        <CreateGroup setShowCreateGroup={setShowCreateGroup} />
      )}
    </>
  );
};

export default SidebarHeader;
