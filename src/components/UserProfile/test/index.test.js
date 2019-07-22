import React from 'react';
import '@testing-library/react/cleanup-after-each';
import {render} from '@testing-library/react';
import UserProfile from '..';
import mockUserProfile from '../../../../__mocks__/userProfile';
import {StateProvider} from '../../../store';
import {reducer} from '../../../App';

const initialState = {
  loading: false,
  profile: mockUserProfile,
  userList: []
};

describe('<UserProfile />', () => {
  const {contributionsCollection, createdAt, login, repositories} = mockUserProfile;
  const {
    contributionCalendar: {totalContributions},
    totalCommitContributions,
    totalPullRequestContributions
  } = contributionsCollection;
  const {totalCount: totalRepos} = repositories;

  it('displays the user profile', () => {
    const {getByText} = render(
      <StateProvider initialState={initialState} reducer={reducer}>
        <UserProfile />
      </StateProvider>
    );
    expect(getByText(login)).toBeTruthy();
    expect(getByText(`${totalRepos} Repositories`)).toBeTruthy();
    expect(getByText(`User since ${new Date(createdAt).getFullYear()}`)).toBeTruthy();
    expect(getByText(`Total: ${totalContributions}`)).toBeTruthy();
    expect(getByText(`Commit Contributions: ${totalCommitContributions}`)).toBeTruthy();
    expect(getByText(`PR Contributions: ${totalPullRequestContributions}`)).toBeTruthy();
  });
});
