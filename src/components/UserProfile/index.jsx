import React from 'react';
import Styles from './UserProfile.scss';
import {useStateValue} from '../../store';

const UserProfile = () => {
  const [{profile}] = useStateValue();
  const {avatarUrl, contributionsCollection = {}, createdAt, login, repositories = {}, url} = profile;
  const {
    contributionCalendar: {totalContributions} = {},
    totalCommitContributions,
    totalPullRequestContributions
  } = contributionsCollection;
  const {totalCount: totalRepos} = repositories;
  if (!profile.login) {
    return null;
  }

  return (
    <>
    <article className={Styles.profile}>
      <h2>{login}</h2>
      <span>{totalRepos} Repositories</span>
      <img src={avatarUrl} alt={login} />
      <span>User since {new Date(createdAt).getFullYear()}</span>
      <h3>Contributions this year</h3>
      <div className={Styles.contributions}>
        <span>Total: {totalContributions}</span>
        <span>Commit Contributions: {totalCommitContributions}</span>
        <span>PR Contributions: {totalPullRequestContributions}</span>
      </div>
      <a href={url} target="_blank" rel="noopener noreferrer">View profile on Github</a>
    </article>
    </>
  );
};

export default UserProfile;
