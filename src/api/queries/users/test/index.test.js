import userSearch from '..';
import mockUserList from '../../../../../__mocks__/userList.json';
import axios from 'axios';

const {data: {search: {edges}}} = mockUserList;

jest.mock('axios', () => ({
  __esModule: true,
  default: jest.fn(() => Promise.resolve({data: 'data'}))
}));

describe('User Search API', () => {
  it('should call userSearch API', async () => {
    axios.mockImplementationOnce(() => Promise.resolve({
      data: mockUserList
    }));
    const list = await userSearch('jcotton');
    expect(list).toEqual(edges);
    expect(axios).toHaveBeenCalledWith({
      data: {
        query: `
        query UserRepos {
          search(query: "jcotton" type: USER first: 10){
            edges{
              node {
                ...on User {
                  login
                  avatarUrl
                  url
                  repositories {
                    totalCount
                  }
                  contributionsCollection {
                    contributionCalendar {
                      totalContributions
                    }
                    totalCommitContributions
                    totalPullRequestContributions
                    
                  }
                  createdAt
                }
              }
            }
          }
        }`
      },
      url: 'https://api.github.com/graphql',
      method: 'POST',
      headers: {Authorization: `bearer ${process.env.GIT_AUTH}`}
    });
  });

  it('should error', async () => {
    axios.mockImplementationOnce(() => Promise.reject({
      statusText: 'err'
    }));
    await userSearch('jcotton').catch(err => {
      expect(err).toEqual(Error({statusText: 'err'}));
    });
  });
});
