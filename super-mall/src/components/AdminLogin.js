// src/components/AdminLogin.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    const q = query(collection(db, 'admins'), where('email', '==', email), where('password', '==', password));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      navigate('/admin-dashboard');
    } else {
      alert('Invalid email or password');
    }
  };

  return (
    <div>
      <h2>Admin Login</h2>
      <form onSubmit={handleAdminLogin}>
        <div>
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
