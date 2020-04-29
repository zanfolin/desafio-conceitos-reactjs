import React, {useState, useEffect} from "react";

import "./styles.css";

import api from './services/api'
import Item from './components/item'

function App() {
  const [repositories, setRepositories] = useState([])

  async function getRepositories() {
    const response = await api.get('/repositories')

    setRepositories(response.data)
  }

  useEffect(() => {
    getRepositories()
  }, [])

  async function handleAddRepository() {
    const response = await api.post(('/repositories'), {
      title: `Novo Repositório ${Date.now()}`,
      url: 'https://github.com/leandrosouzaa',
      techs: ['ReactJS', 'ReactNative', 'NodeJS'], 
    })

    setRepositories([...repositories, response.data])
  }

  async function handleRemoveRepository(id) {
    await api.delete((`/repositories/${id}`));

    setRepositories(repositories.filter(r => r.id !== id))
  }

  return (
    <div>
      <ul data-testid="repository-list">
          {
            repositories.map(r => 
              <li key={r.id}>
              <Item data={r} />
              <button onClick={() => handleRemoveRepository(r.id)}>
                Remover
              </button>
            </li>
          )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
