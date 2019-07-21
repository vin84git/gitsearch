import React from 'react';
import {fireEvent, render} from '@testing-library/react';
import '@testing-library/react/cleanup-after-each';
import Search from '..';

describe('<Search />', () => {
  const props = {
    userSearch: jest.fn()
  };
  const searchTerm = 'jcottongit';
  const inputPlaceholder = /search by github username/i;

  it('performs a search on enter', () => {
    const {getByPlaceholderText} = render(<Search {...props} />);
    fireEvent.keyDown(
      getByPlaceholderText(inputPlaceholder),
      {keyCode: 81}
    );
    expect(props.userSearch).not.toHaveBeenCalled();
    fireEvent.change(
      getByPlaceholderText(inputPlaceholder),
      {target: {value: searchTerm}},
    );
    fireEvent.keyDown(
      getByPlaceholderText(inputPlaceholder),
      {keyCode: 13}
    );
    expect(props.userSearch).toHaveBeenCalledWith(searchTerm);
  });
});
