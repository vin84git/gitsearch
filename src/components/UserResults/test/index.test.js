import React from 'react';
import '@testing-library/react/cleanup-after-each';
import {fireEvent, render} from '@testing-library/react';
import UserResults from '..';
import userList from '../../../../__mocks__/userList';

const {data: {search: {edges: users}}} = userList;

describe('<UserResults />', () => {
  const props = {
    selectUser: jest.fn(),
    users
  };

  it('displays the search results', () => {
    const {getAllByTestId} = render(<UserResults {...props} />);
    expect(getAllByTestId('user').length).toEqual(users.length);
  });

  it('returns the selected user login', () => {
    const {getByText} = render(<UserResults {...props} />);
    fireEvent.click(getByText(users[2].node.login));
    expect(props.selectUser).toHaveBeenCalledWith(users[2].node.login);
  });
});
