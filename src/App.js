import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  //carregar os repositorios quando carregar o componente
  useEffect(() => {
    async function loadRepos() {
      const response = await api.get("/repositories");

      setRepositories(response.data);
    }
    loadRepos();
  }, [repositories]);

  async function handleAddRepository() {
    // TODO
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);

    const response = await api.get("/repositories");

    setRepositories(response.data);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.name}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
