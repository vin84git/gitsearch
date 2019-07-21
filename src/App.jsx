import React, {useReducer} from 'react';
import userQuery from './api/queries/users';
import SearchBar from './components/SearchBar';
import UserResults from './components/UserResults';

const initialState = {
  userList: []
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'resultsLoaded':
      return {
        ...state,
        userList: action.data
      };
    default:
      return state;
  }
};

const App = () => {
  const [{userList}, dispatch] = useReducer(reducer, initialState);
  const search = async (value) => {
    const results = await userQuery(value);
    dispatch({
      type: 'resultsLoaded',
      data: results
    });
  };
  return (
    <div>
      <SearchBar userSearch={search}/>
      <UserResults users={userList}/>
    </div>
  );
};

export default App;
