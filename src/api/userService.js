import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

// Fetch all users
export const fetchUsers = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch users');
  }
};

// Add a new user
export const addUser = async (user) => {
  try {
    const response = await axios.post(API_URL, user);
    return response.data; // Simulated response
  } catch (error) {
    throw new Error('Failed to add user');
  }
};

// Update an existing user
export const updateUser = async (id, user) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, user);
    return response.data; // Simulated response
  } catch (error) {
    throw new Error('Failed to update user');
  }
};

// Delete a user
export const deleteUser = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    return id; // Simulated response
  } catch (error) {
    throw new Error('Failed to delete user');
  }
};
