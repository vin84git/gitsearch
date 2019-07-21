import axios from 'axios';

const userSearch = async (searchTerm) => {
  try {
    const {data: {data: {search: {edges}}}} = await axios({
      url: 'https://api.github.com/graphql',
      headers: {Authorization: `bearer ${process.env.GIT_AUTH}`},
      method: 'POST',
      data: {
        query: `
        query UserRepos {
          search(query: "${searchTerm}" type: USER first: 10){
            edges{
              node {
                ...on User {
                  login
                }
              }
            }
          }
        }`
      }
    });
    return edges;
  } catch (err) {
    throw Error(err);
  }
};

export default userSearch;
