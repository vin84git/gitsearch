import React from 'react';
import '@testing-library/react/cleanup-after-each';
import {render} from '@testing-library/react';
import UserResults from '..';
import userList from '../../../../__mocks__/userList';

const {data: {search: {edges: users}}} = userList;

describe('<UserResults />', () => {
  const props = {
    users
  };

  it('displays the search results', () => {
    const {getAllByTestId} = render(<UserResults {...props} />);
    expect(getAllByTestId('user').length).toEqual(users.length);
  });
});
