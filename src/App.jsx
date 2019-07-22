import React from 'react';
import SearchBar from './components/SearchBar';
import UserResults from './components/UserResults';
import UserProfile from './components/UserProfile';
import Style from './App.scss';
import {StateProvider, FETCHING_RESULTS, PROFILE_SELECTED, RESULTS_LOADED} from './store';

export const initialState = {
  loading: false,
  profile: {},
  userList: []
};

export const reducer = (state, action) => {
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

const App = () => (
  <StateProvider initialState={initialState} reducer={reducer}>
    <div className={Style.container}>
      <header>
        <h1>Github Search</h1>
        <SearchBar />
      </header>
      <div className={Style.content}>
        <UserResults />
        <UserProfile />
      </div>
    </div>
  </StateProvider>
);

export default App;
