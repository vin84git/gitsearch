import React from 'react';
import {array} from 'prop-types';

const userList = ({users}) => (
  <section>
    {users.map(({node}) => {
      const {avatarUrl, login} = node;
      return (
        <div
          key={login}
          data-testid="user"
        >
          {login}
          <img src={avatarUrl}/>
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
