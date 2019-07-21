import React from 'react';
import {number, shape, string} from 'prop-types';
const UserProfile = ({profile}) => {
  const {avatarUrl, contributionsCollection, createdAt, login, repositories, url} = profile;
  const {
    contributionCalendar: {totalContributions},
    totalCommitContributions,
    totalPullRequestContributions
  } = contributionsCollection;
  const {totalCount: totalRepos} = repositories;
  return (
    <article>
      <h2>{login}</h2>
      <span>{totalRepos} Repositories</span>
      <img src={avatarUrl} alt={login} />
      <span>User since {new Date(createdAt).getFullYear()}</span>
      <h3>Contributions this year</h3>
      <div>
        <span>Total: {totalContributions}</span>
        <span>Commit Contributions: {totalCommitContributions}</span>
        <span>PR Contributions: {totalPullRequestContributions}</span>
      </div>
      <a href={url} target="_blank" rel="noopener noreferrer">View profile on Github</a>
    </article>
  );
};

UserProfile.propTypes = {
  profile: shape({
    avatarUrl: string.string,
    createdAt: string.string,
    login: string.string,
    repositories: shape({
      totalCount: number.isRequired
    }).isRequired,
    url: string.string,
    contributionsCollection: shape({
      totalCommitContributions: number.isRequired,
      totalPullRequestContributions: number.isRequired,
      contributionCalendar: shape({
        totalContributions: number.isRequired
      }).isRequired
    })
  }).isRequired
};

export default UserProfile;
