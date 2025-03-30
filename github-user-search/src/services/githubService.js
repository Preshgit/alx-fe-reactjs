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

// Function to search for multiple users (keeping for potential future expansion)
export const searchUsers = async (query) => {
  try {
    const response = await githubApi.get(`/search/users?q=${query}`);
    return response.data;
  } catch (error) {
    console.error("Error searching users:", error);
    throw error;
  }
};
