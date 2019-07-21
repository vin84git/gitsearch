import React from 'react';

import {storiesOf} from '@storybook/react';
import App from '../src/App';
import SearchBar from '../src/components/SearchBar';
import mockUserList from '../__mocks__/userList';

storiesOf('The App', module)
  .add('Search page', () => <App JSON={mockUserList}/>)
  .add('Search bar', () => <SearchBar userSearchBar={() => {}}/>);
