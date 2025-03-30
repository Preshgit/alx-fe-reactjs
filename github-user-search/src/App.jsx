import "./App.css";
import Search from "./components/Search";

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>GitHub User Search</h1>
        <p>Enter a username to find a GitHub profile</p>
      </header>

      <main className="app-main">
        <Search />
      </main>

      <footer className="app-footer">
        <p>Built with React and GitHub API</p>
      </footer>
    </div>
  );
}

export default App;
