import React from 'react';
import '@testing-library/react/cleanup-after-each';
import {render} from '@testing-library/react';
import UserResults from '..';
import userList from '../../../../__mocks__/userList';
import {StateProvider} from '../../../store';
import {reducer} from '../../../App';

const {data: {search: {edges: users}}} = userList;

describe('<UserResults />', () => {

  it('displays the search results', () => {
    const initialState = {
      loading: false,
      profile: {},
      userList: users
    };
 
    const {getAllByTestId} = render(
      <StateProvider initialState={initialState} reducer={reducer}>
        <UserResults />
      </StateProvider>
    );
    expect(getAllByTestId('user').length).toEqual(users.length);
  });

  it('displays no results found', () => {
    const initialState = {
      loading: false,
      profile: {},
      noResults: true,
      userList: []
    };
    
    const {getByText} = render(
      <StateProvider initialState={initialState} reducer={reducer}>
        <UserResults />
      </StateProvider>
    );
    expect(getByText(/No results found/i)).toBeTruthy();
  });
});
