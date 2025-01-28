import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/ManageUsers.css";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/admin/users");
        // Exclude admins from the list
        const filteredUsers = data.filter((user) => user.role !== "admin");
        setUsers(filteredUsers);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch users");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleBlockUnblock = async (userId, isBlocked) => {
    const action = isBlocked ? "Unblock" : "Block";
    const confirmAction = window.confirm(`Are you sure you want to ${action} this user?`);
    if (!confirmAction) return;

    try {
      await axios.patch(`http://localhost:3000/admin/users/${userId}/block`, { isBlocked: !isBlocked });
      setUsers((prev) =>
        prev.map((user) =>
          user._id === userId ? { ...user, isblocked: !isBlocked } : user
        )
      );
      alert(`User ${action.toLowerCase()}ed successfully!`);
    } catch (err) {
      console.error(`Error ${action.toLowerCase()}ing user:`, err);
      alert(`Failed to ${action.toLowerCase()} user. Please try again.`);
    }
  };

  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:3000/admin/users/${userId}`);
      setUsers((prev) => prev.filter((user) => user._id !== userId));
      alert("User deleted successfully!");
    } catch (err) {
      console.error("Error deleting user:", err);
      alert("Failed to delete user. Please try again.");
    }
  };

  if (loading) {
    return <div className="loading">Loading users...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="manage-users">
      <h2>Manage Users</h2>
      <table className="users-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phonenumber}</td>
              <td>{user.role}</td>
              <td>{user.isblocked ? "Blocked" : "Active"}</td>
              <td>
                <button
                  className="block-btn"
                  onClick={() => handleBlockUnblock(user._id, user.isblocked)}
                >
                  {user.isblocked ? "Unblock" : "Block"}
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(user._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
