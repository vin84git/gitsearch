import React from 'react';
import {fireEvent, render} from '@testing-library/react';
import '@testing-library/react/cleanup-after-each';
import Search from '..';
import {StateProvider} from '../../../store';
import {initialState, reducer} from '../../../App';
import userQuery from '../../../api/queries/users';

jest.mock('../../../api/queries/users', () => ({
  __esModule: true,
  default: jest.fn(() => Promise.resolve({data: 'data'}))
}));

describe('<Search />', () => {
  const searchTerm = 'jcottongit';
  const inputPlaceholder = /search by github username/i;

  it('performs a search on enter', () => {
    const {getByPlaceholderText} = render(
      <StateProvider initialState={initialState} reducer={reducer}>
        <Search />
      </StateProvider>
    );
    fireEvent.keyDown(
      getByPlaceholderText(inputPlaceholder),
      {keyCode: 81}
    );
    expect(userQuery).not.toHaveBeenCalled();
    fireEvent.change(
      getByPlaceholderText(inputPlaceholder),
      {target: {value: searchTerm}},
    );
    fireEvent.keyDown(
      getByPlaceholderText(inputPlaceholder),
      {keyCode: 13}
    );
    expect(userQuery).toHaveBeenCalledWith(searchTerm);
  });
});
