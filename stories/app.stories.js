import React from 'react';

import {storiesOf} from '@storybook/react';
import App from '../src/App';
import SearchBar from '../src/components/SearchBar';
import UserResults from '../src/components/UserResults';
import UserProfile from '../src/components/UserProfile';
import mockUserList from '../__mocks__/userList';
import mockUserProfile from '../__mocks__/userProfile';
import {StateProvider} from '../src/store';
import {initialState, reducer} from '../src/App';

const {data: {search: {edges: users}}} = mockUserList;

storiesOf('The App', module)
  .add('Search bar', () => {
    return (
      <StateProvider initialState={initialState} reducer={reducer}>
        <SearchBar/>
      </StateProvider>
    );
  })
  .add('Search page', () => <App/>)
  .add('User results', () => {
    return (
      <StateProvider initialState={{...initialState, userList: users}} reducer={reducer}>
        <UserResults/>
      </StateProvider>
    );
  })
  .add('User profile', () => {
    return (
      <StateProvider initialState={{...initialState, profile: mockUserProfile}} reducer={reducer}>
        <UserProfile/>
      </StateProvider>
    );
  });
