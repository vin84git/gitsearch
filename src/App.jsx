import React, {useState} from 'react';
import userQuery from './api/queries/users';
import SearchBar from './components/SearchBar';

const App = () => {
  const [response, setResponse] = useState([]);
  const search = async (value) => {
    const results = await userQuery(value);
    setResponse(results);
  };
  return (
    <div>
      <SearchBar userSearch={search}/>
      {
        response.map(({node: {login}}) => {
          return <div key={login}>{login}</div>;
        })
      }
    </div>
  );
};

export default App;
