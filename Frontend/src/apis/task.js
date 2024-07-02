import axios from "axios";

const apiUrl = "http://localhost:8000";
const backendUrl = `${apiUrl}/tasks`;

// Function to fetch analytics data
export const getAnalyticsData = async () => {
  try {
    const requestUrl = `${backendUrl}/analytics`;

    // Retrieve authentication token from local storage
    const token = localStorage.getItem("tokenPro");

    // Set authorization header with the token
    axios.defaults.headers.common["Authorization"] = token;

    // Perform GET request to fetch analytics data
    const response = await axios.get(requestUrl);

    return response?.data; // Return response data if successful
  } catch (error) {
    return error.response?.data; // Return error response data if request fails
  }
};

// Function to fetch tasks based on a filter
export const getTasks = async (typeOfFilter) => {
  try {
    const requestUrl = `${backendUrl}/all?typeOfFilter=${typeOfFilter}`;

    // Retrieve authentication token from local storage
    const token = localStorage.getItem("tokenPro");

    // Set authorization header with the token
    axios.defaults.headers.common["Authorization"] = token;

    // Perform GET request to fetch tasks with specified filter
    const response = await axios.get(requestUrl);

    return response?.data; // Return response data if successful
  } catch (error) {
    return error.response?.data; // Return error response data if request fails
  }
};

// Function to update checklist items of a task
export const checkItems = async (taskId, itemId, selected) => {
  try {
    const requestUrl = `${backendUrl}/checklist/${taskId}/${itemId}`;
    const payload = { selected };

    // Retrieve authentication token from local storage
    const token = localStorage.getItem("tokenPro");

    // Set authorization header with the token
    axios.defaults.headers.common["Authorization"] = token;

    // Perform PUT request to update checklist item status
    const response = await axios.put(requestUrl, payload);

    return response?.data; // Return response data if successful
  } catch (error) {
    console.log(error); // Log any errors to the console
  }
};

// Function to create a new task
export const createTask = async ({
  title,
  priority,
  checklist,
  dueDate,
  status,
}) => {
  try {
    const requestUrl = `${backendUrl}/create`;
    const payload = {
      title,
      priority,
      checklist,
      dueDate,
      status,
    };

    // Retrieve authentication token from local storage
    const token = localStorage.getItem("tokenPro");

    // Set authorization header with the token
    axios.defaults.headers.common["Authorization"] = token;

    // Perform POST request to create a new task
    const response = await axios.post(requestUrl, payload);

    return response?.data; // Return response data if successful
  } catch (error) {
    console.log(error); // Log any errors to the console
  }
};

// Function to move a task to a different status
export const moveTask = async (taskId, status) => {
  try {
    const requestUrl = `${backendUrl}/${taskId}/move`;
    const payload = { status };

    // Retrieve authentication token from local storage
    const token = localStorage.getItem("tokenPro");

    // Set authorization header with the token
    axios.defaults.headers.common["Authorization"] = token;

    // Perform PUT request to move the task to a different status
    const response = await axios.put(requestUrl, payload);

    return response?.data; // Return response data if successful
  } catch (error) {
    console.log(error); // Log any errors to the console
  }
};

// Function to delete a task
export const deleteTask = async (taskId) => {
  try {
    const requestUrl = `${backendUrl}/delete-task/${taskId}`;

    // Retrieve authentication token from local storage
    const token = localStorage.getItem("tokenPro");

    // Set authorization header with the token
    axios.defaults.headers.common["Authorization"] = token;

    // Perform DELETE request to delete the task
    const response = await axios.delete(requestUrl);

    return response?.data; // Return response data if successful
  } catch (error) {
    console.log(error); // Log any errors to the console
  }
};

// Function to fetch task description by ID
export const getTaskDescription = async (taskId) => {
  try {
    const requestUrl = `${backendUrl}/task-description/${taskId}`;

    // Perform GET request to fetch task description by ID
    const response = await axios.get(requestUrl);

    return response?.data; // Return response data if successful
  } catch (error) {
    console.log(error); // Log any errors to the console
  }
};

// Function to edit task details by ID
export const editTaskById = async (
  taskId,
  title,
  priority,
  checklist,
  status,
  dueDate
) => {
  try {
    const requestUrl = `${backendUrl}/edit/${taskId}`;
    const reqPayload = {
      title,
      priority,
      checklist,
      status,
      dueDate,
    };

    // Retrieve authentication token from local storage
    const token = localStorage.getItem("tokenPro");

    // Set authorization header with the token
    axios.defaults.headers.common["Authorization"] = token;

    // Perform PUT request to edit task details by ID
    const response = await axios.put(requestUrl, reqPayload);

    return response?.data; // Return response data if successful
  } catch (error) {
    console.log(error); // Log any errors to the console
  }
};
