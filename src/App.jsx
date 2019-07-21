import React, {useReducer} from 'react';
import userQuery from './api/queries/users';
import SearchBar from './components/SearchBar';
import UserProfile from './components/UserProfile';
import UserResults from './components/UserResults';

const PROFILE_SELECTED = 'PROFILE_SELECTED';
const RESULTS_LOADED = 'RESULTS_LOADED';

const initialState = {
  profile: {},
  userList: []
};

const reducer = (state, action) => {
  switch (action.type) {
    case RESULTS_LOADED:
      return {
        profile: {},
        userList: action.data
      };
    case PROFILE_SELECTED:
      return {
        ...state,
        profile: action.data
      };
    default:
      return state;
  }
};

const App = () => {
  const [{profile, userList}, dispatch] = useReducer(reducer, initialState);
  const search = async (value) => {
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
    <div>
      <SearchBar userSearch={search}/>
      <UserResults users={userList} selectUser={selectUser}/>
      {profile.login && <UserProfile profile={profile}/>}
    </div>
  );
};

export default App;
