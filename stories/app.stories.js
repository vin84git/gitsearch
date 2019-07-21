import React from 'react';

import {storiesOf} from '@storybook/react';
import App from '../src/App';
import SearchBar from '../src/components/SearchBar';
import mockUserList from '../__mocks__/userList';

storiesOf('The App', module)
  .add('search page', () => <App JSON={mockUserList}/>)
  .add('search bar', () => <SearchBar userSearchBar={() => {}}/>);
