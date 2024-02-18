import { useState } from 'react';
import { SidebarHeader } from './header';
import { Notifications } from './notifications';
import { Search, SearchResults } from './search';
import { Conversations } from './conversations';

const Sidebar = () => {
  const [searchResults, setSearchResuts] = useState([]);
  return (
    <div className='flex0030 max-w-[30%] h-full select-none'>
      {/* Sidebar Header */}
      <SidebarHeader />

      {/* Notifications */}
      <Notifications />
      {/* Search */}
      <Search
        searchLength={searchResults?.length}
        setSearchResuts={setSearchResuts}
      />
      {searchResults?.length > 0 ? (
        <>
          {/* Search results */}
          <SearchResults
            searchResults={searchResults}
            setSearchResuts={setSearchResuts}
          />
        </>
      ) : (
        <>
          {/* Conversations */}
          <Conversations />
        </>
      )}
    </div>
  );
};

export default Sidebar;
