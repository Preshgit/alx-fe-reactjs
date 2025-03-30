import axios from "axios";

// Base URL for GitHub API
const BASE_URL = "https://api.github.com";

// Create an axios instance with base configuration
const githubApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add authentication if you have a GitHub API key
// This is optional for basic usage but helps with rate limiting
if (import.meta.env.VITE_APP_GITHUB_API_KEY) {
  githubApi.defaults.headers.common["Authorization"] = `token ${
    import.meta.env.VITE_APP_GITHUB_API_KEY
  }`;
}

// Function to fetch user data by username
export const fetchUserData = async (username) => {
  try {
    const response = await githubApi.get(`/users/${username}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

// Function for advanced user search with multiple criteria
export const advancedUserSearch = async (params) => {
  try {
    // Build query string based on provided parameters
    let queryParts = [];

    // Add username/keyword
    if (params.keyword) {
      queryParts.push(params.keyword);
    }

    // Add location if provided
    if (params.location) {
      queryParts.push(`location:${params.location}`);
    }

    // Add minimum repositories if provided
    if (params.minRepos) {
      queryParts.push(`repos:>=${params.minRepos}`);
    }

    // Add followers if provided
    if (params.minFollowers) {
      queryParts.push(`followers:>=${params.minFollowers}`);
    }

    // Build the final query string
    const queryString = queryParts.join("+");

    // Make the API request
    const response = await githubApi.get("/search/users", {
      params: {
        q: queryString,
        per_page: params.perPage || 10,
        page: params.page || 1,
        sort: params.sort || "followers",
        order: params.order || "desc",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error searching users:", error);
    throw error;
  }
};

// Function to get additional user details for search results
export const getUserDetails = async (username) => {
  try {
    const response = await githubApi.get(`/users/${username}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching details for ${username}:`, error);
    throw error;
  }
};

// Function to get user repositories
export const getUserRepositories = async (username, page = 1, perPage = 5) => {
  try {
    const response = await githubApi.get(`/users/${username}/repos`, {
      params: {
        page,
        per_page: perPage,
        sort: "updated",
        direction: "desc",
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching repositories for ${username}:`, error);
    throw error;
  }
};
