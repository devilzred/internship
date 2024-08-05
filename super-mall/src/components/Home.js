// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Welcome to Super Mall</h1>
      <div>
        <h2>User Section</h2>
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
      </div>
      <div>
        <h2>Admin Section</h2>
        <Link to="/admin-login">Admin Login</Link>
      </div>
    </div>
  );
};

export default Home;
