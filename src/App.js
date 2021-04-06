import React, { useState, useEffect } from 'react';

const App = ({ login }) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  
  useEffect(() => {
    if(!login) return;
      setLoading(true)
      fetch(`https://api.github.com/users/${login}`)
      .then(response => response.json())
      .then(setData)
      .then(() => setLoading(false))
      .catch(setError);
  }, [login]) 

  if(loading) return <h1>Loading...</h1>;
  if(error) 
    return <pre>{JSON.stringify(error, null, 2)}</pre>;
  if(!data) return null;

  if(data){
    return (
      <div>
        <h1>{data.name}</h1>
        <h2>Username: {data.login}</h2>
        <img alt={data.login} src={data.avatar_url} />
        <p>Public Repos: {data.public_repos}</p>
        <p>URL: {data.url}</p>
        <p>Followers: {data.followers}</p>
        <p>Followers URL: {data.followers_url}</p>
        <p>Following: {data.following}</p>
        <p>Following URL: {data.following_url}</p>
      </div>
    );
  };
};

export default App;