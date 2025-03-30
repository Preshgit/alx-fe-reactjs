import Search from "./components/Search";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6">
      <header className="max-w-4xl mx-auto mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          GitHub User Explorer
        </h1>
        <p className="text-gray-600">
          Find and explore GitHub users with advanced search capabilities
        </p>
      </header>

      <main>
        <Search />
      </main>

      <footer className="max-w-4xl mx-auto mt-12 pt-6 border-t border-gray-200 text-center text-gray-500 text-sm">
        <p>Built with React and GitHub API • {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

export default App;
