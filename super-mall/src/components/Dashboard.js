// src/components/Dashboard.js
import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div>
            <header>
                <h1>Dashboard</h1>
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/manage-shop">Manage Shop</Link></li>
                    </ul>
                </nav>
            </header>
            <main>
                <h2>Welcome to your Dashboard</h2>
                <p>Manage your shop and view offers.</p>
            </main>
        </div>
    );
};

export default Dashboard;
