import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import CreateShop from './CreateShop';
import ManageShops from './ManageShops';
import ManageFloors from './ManageFloors';
import ManageCategories from './ManageCategories';
import ManageOffers from './ManageOffers';
import Logout from './Logout';

const AdminDashboard = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <nav>
        <ul>
          <li><Link to="create-shop">Create Shop</Link></li>
          <li><Link to="manage-shops">Manage Shops</Link></li>
          <li><Link to="manage-floors">Manage Floors</Link></li>
          <li><Link to="manage-categories">Manage Categories</Link></li>
          <li><Link to="manage-offers">Manage Offers</Link></li>
          <li><Link to="sign-out">Logout</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="create-shop" element={<CreateShop />} />
        <Route path="manage-shops" element={<ManageShops />} />
        <Route path="manage-floors" element={<ManageFloors />} />
        <Route path="manage-categories" element={<ManageCategories />} />
        <Route path="manage-offers" element={<ManageOffers />} />
        <Route path="sign-out" element={<Logout />} />
      </Routes>
    </div>
  );
};

export default AdminDashboard;
