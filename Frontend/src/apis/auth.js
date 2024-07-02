import axios from "axios";

const apiUrl = "http://localhost:8000";
const backendUrl = `${apiUrl}/auth`;

// Function to register a user
export const registerUser = async ({ name, email, password }) => {
  try {
    const requestUrl = `${backendUrl}/register`;
    const reqPayload = { name, email, password };

    const response = await axios.post(requestUrl, reqPayload);

    return response?.data; // Return the response data if successful
  } catch (error) {
    return error.response?.data; // Return the error response data if request fails
  }
};

// Function to log in a user
export const loginUser = async ({ email, password }) => {
  try {
    const requestUrl = `${backendUrl}/login`;
    const reqPayload = { email, password };

    const response = await axios.post(requestUrl, reqPayload);

    return response?.data; // Return the response data if successful
  } catch (error) {
    return error.response?.data; // Return the error response data if request fails
  }
};

// Function to update username or password
export const updateUsernameOrPassword = async ({ name, password }) => {
  try {
    const requestUrl = `${backendUrl}/settings/update`;
    const reqPayload = { name, password };

    // Get the authentication token from local storage
    const token = localStorage.getItem("tokenPro");

    // Set the token in the request headers for authorization
    axios.defaults.headers.common["Authorization"] = token;

    const response = await axios.put(requestUrl, reqPayload);

    return response?.data; // Return the response data if successful
  } catch (error) {
    console.log(error); // Log any errors to the console
    return error.response?.data; // Return the error response data if request fails
  }
};
