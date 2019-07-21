import React from 'react';
import {array} from 'prop-types';
import Styles from './UserResults.scss';

const userList = ({selectUser, users}) => (
  <section className={Styles.userList}>
    {users.map(({node}) => {
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

userList.propTypes = {
  users: array
};

userList.defaultProps = {
  users: []
};

export default userList;
