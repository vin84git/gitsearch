import React, {useState} from 'react';
import userQuery from '../../api/queries/users';
import {useStateValue, FETCHING_RESULTS, RESULTS_LOADED} from '../../store';

const SearchBox = () => {
  const [{loading}, dispatch] = useStateValue();
  const [searchTerm, setSearchTerm] = useState('');

  const search = async (value) => {
    dispatch({
      type: FETCHING_RESULTS
    });
    const results = await userQuery(value);
    dispatch({
      type: RESULTS_LOADED,
      data: results
    });
  };

  const submitSearch = () => {
    search(searchTerm);
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
        disabled={loading}
      />
      <button
        title="Search"
        onClick={submitSearch}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBox;
