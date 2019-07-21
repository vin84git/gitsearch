import userSearch from '..';
import mockUserList from '../../../../../__mocks__/userList.json';
import mockAxios from 'axios';

const {data: {search: {edges}}} = mockUserList;

describe('User Search API', () => {
  it('should call userSearch API', async () => {
    mockAxios.post.mockImplementationOnce(() => Promise.resolve({
      data: mockUserList
    }));
    const list = await userSearch('jcotton');
    expect(list).toEqual(edges);
    expect(mockAxios.post).toHaveBeenCalledWith({
      data: {
        query: `
        query UserRepos {
          search(query: "jcotton" type: USER first: 10){
            edges{
              node {
                ...on User {
                  login
                }
              }
            }
          }
        }`
      },
      url: 'https://api.github.com/graphql',
      headers: {Authorization: `bearer ${process.env.GIT_AUTH}`}
    });
  });

  it('should error', async () => {
    mockAxios.post.mockImplementationOnce(() => Promise.reject({
      statusText: 'err'
    }));
    await userSearch('jcotton').catch(err => {
      expect(err).toEqual(Error({statusText: 'err'}));
    });
  });
});
