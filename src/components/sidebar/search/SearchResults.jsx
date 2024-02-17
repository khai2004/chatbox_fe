import Contact from './Contact';

const SearchResults = ({ searchResults, setSearchResuts }) => {
  console.log(searchResults);
  return (
    <div className='w-full conver scrollbar'>
      <div>
        {/* Heading */}
        <div className='flex flex-col px-8 pt-8'>
          <h1 className='font-extralight text-lg text-green_2'>Contacts</h1>
          <span className='w-full mt-4 ml-10 border-b dark:border-b-dark_border_1'></span>
        </div>
        {/* Results */}
        <ul>
          {searchResults &&
            searchResults.map((user) => (
              <Contact
                contact={user}
                key={user._id}
                setSearchResuts={setSearchResuts}
              />
            ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchResults;
