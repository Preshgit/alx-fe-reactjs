import { useState, useEffect } from "react";
import { advancedUserSearch, getUserDetails } from "../services/githubService";
import UserCard from "./UserCard";

function Search() {
  // Form state
  const [searchParams, setSearchParams] = useState({
    keyword: "",
    location: "",
    minRepos: "",
    minFollowers: "",
    page: 1,
    perPage: 10,
  });

  // Results state
  const [users, setUsers] = useState([]);
  const [detailedUsers, setDetailedUsers] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Handle input changes
  const handleInputChange = (e) => {
    setSearchParams((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setCurrentPage(1);
    await performSearch(1);
  };

  // Load more results
  const handleLoadMore = async () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    await performSearch(nextPage);
  };

  // Perform the search operation
  const performSearch = async (page) => {
    setIsLoading(true);
    setError(null);

    if (page === 1) {
      setUsers([]);
      setDetailedUsers([]);
    }

    try {
      // Build search parameters
      const searchQuery = {
        ...searchParams,
        page: page,
      };

      // Validate at least one search field is populated
      if (
        !searchQuery.keyword &&
        !searchQuery.location &&
        !searchQuery.minRepos &&
        !searchQuery.minFollowers
      ) {
        setError("Please provide at least one search criteria");
        setIsLoading(false);
        return;
      }

      // Perform the search
      const response = await advancedUserSearch(searchQuery);

      setTotalCount(response.total_count);

      if (page === 1) {
        setUsers(response.items);
      } else {
        setUsers((prevUsers) => [...prevUsers, ...response.items]);
      }

      // If no users were found
      if (response.items.length === 0) {
        setError("Looks like we cant find the user");
      }
    } catch (err) {
      setError("An error occurred while searching. Please try again.");
      console.error("Search error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch detailed information for each user
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        // Get only new users that we haven't fetched details for yet
        const newUsers = users.filter(
          (user) =>
            !detailedUsers.some((detailed) => detailed.login === user.login)
        );

        if (newUsers.length === 0) return;

        // Fetch details for each new user (limit concurrent requests)
        const detailPromises = newUsers.map((user) =>
          getUserDetails(user.login)
        );
        const userDetailsResults = await Promise.all(detailPromises);

        // Ensure each user has avatar_url property and img property
        const processedUsers = userDetailsResults.map((user) => {
          // Set default avatar if missing
          const defaultAvatar =
            "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png";

          return {
            ...user,
            avatar_url: user.avatar_url || defaultAvatar,
            img: {
              src: user.avatar_url || defaultAvatar,
              alt: `${user.login}'s avatar`,
            },
          };
        });

        setDetailedUsers((prev) => [...prev, ...processedUsers]);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    if (users.length > 0) {
      fetchUserDetails();
    }
  }, [users]);

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Advanced Search Form */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Advanced GitHub User Search
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Username/Keyword Field */}
            <div>
              <label
                htmlFor="keyword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Username/Keyword
              </label>
              <input
                type="text"
                id="keyword"
                name="keyword"
                value={searchParams.keyword}
                onChange={handleInputChange}
                placeholder="octocat, john, etc."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Location Field */}
            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={searchParams.location}
                onChange={handleInputChange}
                placeholder="San Francisco, London, etc."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Minimum Repositories Field */}
            <div>
              <label
                htmlFor="minRepos"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Minimum Repositories
              </label>
              <input
                type="number"
                id="minRepos"
                name="minRepos"
                value={searchParams.minRepos}
                onChange={handleInputChange}
                placeholder="10"
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Minimum Followers Field */}
            <div>
              <label
                htmlFor="minFollowers"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Minimum Followers
              </label>
              <input
                type="number"
                id="minFollowers"
                name="minFollowers"
                value={searchParams.minFollowers}
                onChange={handleInputChange}
                placeholder="100"
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Search Users
            </button>
          </div>
        </form>
      </div>

      {/* Results Section */}
      <div className="bg-white shadow-md rounded-lg p-6">
        {/* Results Header */}
        {!isLoading && !error && detailedUsers.length > 0 && (
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium text-gray-800">
              Found {totalCount} user{totalCount !== 1 ? "s" : ""}
            </h3>
            <p className="text-sm text-gray-500">
              Showing {detailedUsers.length} of {totalCount}
            </p>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600">Loading...</span>
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="bg-red-50 border border-red-200 text-red-600 rounded-md p-4 my-4">
            {error}
          </div>
        )}

        {/* Results Grid */}
        {!isLoading && !error && detailedUsers.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {detailedUsers.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        )}

        {/* No Results State */}
        {!isLoading && detailedUsers.length === 0 && !error && (
          <div className="text-center py-12 text-gray-500">
            No users found. Try adjusting your search criteria.
          </div>
        )}

        {/* Load More Button */}
        {!isLoading &&
          !error &&
          detailedUsers.length > 0 &&
          detailedUsers.length < totalCount && (
            <div className="mt-8 text-center">
              <button
                onClick={handleLoadMore}
                className="px-6 py-2 bg-gray-800 text-white font-medium rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Load More Results
              </button>
            </div>
          )}
      </div>
    </div>
  );
}

export default Search;
