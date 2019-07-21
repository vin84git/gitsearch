import React from 'react';

import {storiesOf} from '@storybook/react';
import App from '../src/App';
import mockUserList from '../__mocks__/userList';

storiesOf('The App', module)
  .add('to Storybook', () => <App JSON={mockUserList}/>);
