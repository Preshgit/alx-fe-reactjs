import { useState } from "react";
import "./App.css";
import SearchForm from "./components/SearchForm";
import UserList from "./components/UserList";
import { searchUsers } from "./services/githubApi";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (query) => {
    setLoading(true);
    setError(null);

    try {
      const data = await searchUsers(query);
      setUsers(data.items);
    } catch (err) {
      setError("Failed to fetch users. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>GitHub User Search</h1>
      </header>

      <main className="app-main">
        <SearchForm onSearch={handleSearch} />

        {error && <div className="error-message">{error}</div>}

        <UserList users={users} loading={loading} />
      </main>

      <footer className="app-footer">
        <p>Built with React and GitHub API</p>
      </footer>
    </div>
  );
}

export default App;
