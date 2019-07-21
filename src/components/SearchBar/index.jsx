import React, {useState} from 'react';
import {func} from 'prop-types';

const SearchBox = ({userSearch}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const submitSearch = () => {
    userSearch(searchTerm);
    setSearchTerm('');
  };
  const keyPress = (e) => {
    if (e.keyCode === 13) {
      submitSearch();
    }
  };

  return (
    <div>
      <input
        onChange={e => setSearchTerm(e.target.value)}
        onKeyDown={keyPress}
        placeholder="Search by Github username"
        type="text"
        value={searchTerm}
      />
      <button
        onClick={submitSearch}
      >
        Search
      </button>
    </div>
  );
};

SearchBox.propTypes = {
  userSearch: func.isRequired
};

export default SearchBox;
