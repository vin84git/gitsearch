import React, {useReducer} from 'react';
import userQuery from './api/queries/users';
import SearchBar from './components/SearchBar';
import UserProfile from './components/UserProfile';
import UserResults from './components/UserResults';
import Style from './App.scss';

const FETCHING_RESULTS = 'FETCHING_RESULTS';
const PROFILE_SELECTED = 'PROFILE_SELECTED';
const RESULTS_LOADED = 'RESULTS_LOADED';

const initialState = {
  loading: false,
  profile: {},
  userList: []
};

const reducer = (state, action) => {
  switch (action.type) {
    case FETCHING_RESULTS:
      return {
        loading: true,
        profile: {},
        userList: []
      };
    case PROFILE_SELECTED:
      return {
        ...state,
        profile: action.data
      };
    case RESULTS_LOADED:
      return {
        loading: false,
        noResults: !action.data.length,
        profile: {},
        userList: action.data
      };
    default:
      return state;
  }
};

const App = () => {
  const [{profile, loading, noResults, userList}, dispatch] = useReducer(reducer, initialState);
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
  const selectUser = (userLogin) => {
    const {node} = userList.find(({node}) => node.login === userLogin);
    dispatch({
      type: PROFILE_SELECTED,
      data: node
    });
  };

  return (
    <div className={Style.container}>
      <header>
        <h1>Github Search</h1>
        <SearchBar userSearch={search}/>
      </header>
      <div className={Style.content}>
        {loading && <span>Loading results...</span>}
        {noResults && <span>No results found</span>}
        <UserResults users={userList} selectUser={selectUser}/>
        {profile.login && <UserProfile profile={profile}/>}
      </div>
    </div>
  );
};

export default App;
