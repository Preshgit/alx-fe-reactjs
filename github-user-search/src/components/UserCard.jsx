import { useState, useEffect } from "react";
import { getUserRepositories } from "../services/githubService";

function UserCard({ user }) {
  const [repos, setRepos] = useState([]);
  const [isLoadingRepos, setIsLoadingRepos] = useState(false);

  useEffect(() => {
    const fetchRepos = async () => {
      if (!user) return;

      setIsLoadingRepos(true);
      try {
        const repositories = await getUserRepositories(user.login);
        setRepos(repositories.slice(0, 3)); // Show top 3 repos
      } catch (error) {
        console.error("Error fetching repositories:", error);
      } finally {
        setIsLoadingRepos(false);
      }
    };

    fetchRepos();
  }, [user]);

  if (!user) return null;

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="flex p-4 border-b border-gray-200">
        <img
          src={user.avatar_url}
          alt={`${user.login}'s avatar`}
          className="w-16 h-16 rounded-full object-cover mr-4"
        />
        <div>
          <h3 className="text-lg font-medium text-gray-800">
            {user.name || user.login}
          </h3>
          <p className="text-sm text-gray-500">@{user.login}</p>

          {user.company && (
            <p className="text-sm text-gray-600 mt-1">
              <span className="mr-1">🏢</span>
              {user.company}
            </p>
          )}

          {user.location && (
            <p className="text-sm text-gray-600">
              <span className="mr-1">📍</span>
              {user.location}
            </p>
          )}
        </div>
      </div>

      <div className="p-4">
        {user.bio && (
          <p className="text-sm text-gray-700 mb-3">
            {user.bio.length > 100
              ? `${user.bio.substring(0, 100)}...`
              : user.bio}
          </p>
        )}

        <div className="flex space-x-4 mb-3">
          <div className="text-sm">
            <span className="font-medium text-gray-900">
              {user.public_repos}
            </span>
            <span className="text-gray-500 ml-1">repos</span>
          </div>
          <div className="text-sm">
            <span className="font-medium text-gray-900">{user.followers}</span>
            <span className="text-gray-500 ml-1">followers</span>
          </div>
          <div className="text-sm">
            <span className="font-medium text-gray-900">{user.following}</span>
            <span className="text-gray-500 ml-1">following</span>
          </div>
        </div>

        {/* Top Repositories Section */}
        <div className="mt-3">
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            Top Repositories
          </h4>

          {isLoadingRepos ? (
            <p className="text-xs text-gray-500">Loading repositories...</p>
          ) : repos.length > 0 ? (
            <div className="space-y-2">
              {repos.map((repo) => (
                <div
                  key={repo.id}
                  className="text-xs p-2 bg-gray-50 rounded-md"
                >
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-blue-600 hover:underline"
                  >
                    {repo.name}
                  </a>
                  {repo.description && (
                    <p className="text-gray-600 mt-1 truncate">
                      {repo.description}
                    </p>
                  )}
                  <div className="flex items-center mt-1 space-x-3">
                    {repo.language && (
                      <span className="flex items-center text-gray-500">
                        <span className="w-2 h-2 rounded-full bg-blue-500 mr-1"></span>
                        {repo.language}
                      </span>
                    )}
                    <span className="flex items-center text-gray-500">
                      <span className="mr-1">⭐</span>
                      {repo.stargazers_count}
                    </span>
                    <span className="flex items-center text-gray-500">
                      <span className="mr-1">🍴</span>
                      {repo.forks_count}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-gray-500">No public repositories</p>
          )}
        </div>

        <div className="mt-4">
          <a
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            View Full Profile
          </a>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
