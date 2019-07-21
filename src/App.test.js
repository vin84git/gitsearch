import React from 'react';
import '@testing-library/react/cleanup-after-each';
import {act, fireEvent, render, wait} from '@testing-library/react';
import App from './App';
import mockUserList from '../__mocks__/userList';

jest.mock('axios', () => ({
  __esModule: true,
  default: jest.fn(() => Promise.resolve({data: mockUserList}))
}));

describe('<App />', () => {
  const inputPlaceholder = /search by github username/i;

  it('displays the results list after a search', async () => {
    const {getByPlaceholderText, getByText} = render(<App />);
    act(() => {
      fireEvent.change(
        getByPlaceholderText(inputPlaceholder),
        {target: {value: 'jcotton'}}
      );
      fireEvent.click(getByText(/search/i));
    });
    await wait(() => expect(getByText('jcotton42')).toBeTruthy());
  });

  it('displays the selected profile', async () => {
    const {getByPlaceholderText, getByText} = render(<App />);
    act(async () => {
      fireEvent.change(
        getByPlaceholderText(inputPlaceholder),
        {target: {value: 'jcotton'}}
      );
      fireEvent.click(getByText(/search/i));
      await wait(() => fireEvent.click(getByText(/jcotton42/i)));
    });
    await wait(() => expect(getByText('Total: 45')).toBeTruthy());
  });
});
