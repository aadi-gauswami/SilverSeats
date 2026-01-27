import React, { useEffect, useState } from "react";
import { getAllUsers } from "../api-helpers/api-helpers";
import "./adminMovies.css"; 

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  

  const fetchUsers = async () => {
      const data = await getAllUsers();
      if (Array.isArray(data)) setUsers(data);
      else if (Array.isArray(data?.movies)) setUsers(data.movies);
      else setUsers([]);
    };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="admin-page">

    <header className="admin-header">
        <h1>SilverSeats Admin</h1>
        <p>Movie Management Panel</p>
    </header>

    <div className="table-section">
      <h1>User List</h1>

      <table className="movie-table">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Email</th>
            <th>Mobile Number</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.mobileno}</td>
              <td>{user.age}</td>
              <td>{user.gender}</td>
              <td>{user.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    </div>
  );
};

export default UsersPage;
