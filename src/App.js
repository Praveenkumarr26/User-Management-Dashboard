import React, { useState, useEffect } from 'react';
import { fetchUsers, addUser, updateUser, deleteUser } from './api/userService';
import UserList from './components/UserList';
import UserForm from './components/UserForm';

const App = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      }
    };
    loadUsers();
  }, []);

  const handleEdit = (user) => {
    setEditingUser(user);
    setShowForm(true);
  };

  const handleFormSubmit = async (user) => {
    try {
      if (user.id) {
        const updatedUser = await updateUser(user.id, user);
        setUsers((prev) =>
          prev.map((u) => (u.id === updatedUser.id ? updatedUser : u))
        );
      } else {
        const newUser = await addUser(user);
        setUsers((prev) => [...prev, { ...newUser, id: prev.length + 1 }]);
      }
      setShowForm(false);
    } catch (err) {
      alert('Failed to save user');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCancel = () => {
    setEditingUser(null);
    setShowForm(false);
  };

  return (
    <div>
      <h1>User Management Dashboard</h1>
      {error && <p className="error">{error}</p>}
      {showForm ? (
        <UserForm
          user={editingUser}
          onSubmit={handleFormSubmit}
          onCancel={handleCancel}
        />
      ) : (
        <UserList users={users} onEdit={handleEdit} onDelete={handleDelete} />
      )}
    </div>
  );
};

export default App;
