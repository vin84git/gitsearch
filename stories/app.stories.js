import React from 'react';

import {storiesOf} from '@storybook/react';
import App from '../src/App';
import SearchBar from '../src/components/SearchBar';
import UserResults from '../src/components/UserResults';
import UserProfile from '../src/components/UserProfile';
import mockUserList from '../__mocks__/userList';
import mockUserProfile from '../__mocks__/userProfile';

const {data: {search: {edges: users}}} = mockUserList;

storiesOf('The App', module)
  .add('Search bar', () => <SearchBar userSearchBar={() => {}}/>)
  .add('Search page', () => <App/>)
  .add('User results', () => <UserResults users={users}/>)
  .add('User results', () => <UserProfile profile={mockUserProfile}/>);
