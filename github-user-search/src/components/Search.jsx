import { useState } from "react";
import { fetchUserData } from "../services/githubService";

function Search() {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username.trim()) return;

    setIsLoading(true);
    setError(null);
    setUserData(null);

    try {
      const data = await fetchUserData(username);
      setUserData(data);
    } catch (err) {
      setError("Looks like we can't find the user");
      console.error("Error fetching user:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username"
          className="search-input"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      <div className="results-container">
        {isLoading && <p className="loading-message">Loading...</p>}

        {error && <p className="error-message">{error}</p>}

        {userData && !isLoading && !error && (
          <div className="user-profile">
            <img
              src={userData.avatar_url}
              alt={`${userData.login}'s avatar`}
              className="user-avatar"
            />
            <div className="user-info">
              <h2>{userData.name || userData.login}</h2>
              <p className="username">@{userData.login}</p>

              {userData.bio && <p className="user-bio">{userData.bio}</p>}

              <div className="user-stats">
                <div className="stat">
                  <span className="stat-count">{userData.followers}</span>
                  <span className="stat-label">Followers</span>
                </div>
                <div className="stat">
                  <span className="stat-count">{userData.following}</span>
                  <span className="stat-label">Following</span>
                </div>
                <div className="stat">
                  <span className="stat-count">{userData.public_repos}</span>
                  <span className="stat-label">Repos</span>
                </div>
              </div>

              <a
                href={userData.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="profile-link"
              >
                View on GitHub
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
