import React from 'react';
import Styles from './UserResults.scss';
import {useStateValue, PROFILE_SELECTED} from '../../store';

const UserResults = () => {
  const [{loading, noResults, userList}, dispatch] = useStateValue();

  const selectUser = (userLogin) => {
    const {node} = userList.find(({node}) => node.login === userLogin);
    dispatch({
      type: PROFILE_SELECTED,
      data: node
    });
  };

  return (
    <section className={Styles.userList}>
      {loading && <span>Loading results...</span>}
      {noResults && <span>No results found</span>}
      {userList.map(({node}) => {
        const {avatarUrl, login} = node;
        return (
          <div
            key={login}
            onClick={() => selectUser(login)}
            data-testid="user"
            className={Styles.user}
          >
            <img src={avatarUrl} alt={login}/>
            {login}
          </div>
        );
      })}
    </section>
  );
};

export default UserResults;
