import React from 'react';
import {array} from 'prop-types';

const userList = ({selectUser, users}) => (
  <section>
    {users.map(({node}) => {
      const {avatarUrl, login} = node;
      return (
        <div
          key={login}
          onClick={() => selectUser(login)}
          data-testid="user"
        >
          {login}
          <img src={avatarUrl} alt={login}/>
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
