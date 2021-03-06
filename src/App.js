import React, { useState, useEffect } from "react";

import api from './services/api';
import "./styles.css";

function App() {

    const [repositories, setRepositories] = useState([]);

    useEffect(() => {
      api.get('repositories').then((response)=> {
          setRepositories(response.data);
      })
    }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories',{
      title: `novo projeto ${Date.now()}`,
    });
  
    const repository = response.data;

    setRepositories([...repositories, repository])
  }


  async function handleRemoveRepository(id) {
    
      await api.delete(`/repositories/${id}`);
      setRepositories(
        repositories.filter((repo) => repo.id !== id)
      );
    
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repo) => (
          <li> 
            <a href={repo.url}>{repo.title}</a>
            <button onClick={() => handleRemoveRepository(repo.id)}> Remover </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
