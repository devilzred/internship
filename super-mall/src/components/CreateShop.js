import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from "firebase/firestore";

const CreateShop = () => {
  const [shopName, setShopName] = useState('');
  const [category, setCategory] = useState('');
  const [floor, setFloor] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!shopName || !category || !floor) {
      setError('All fields are required');
      return;
    }
    setError('');
    try {
      await addDoc(collection(db, 'shops'), {
        name: shopName,
        category: category,
        floor: floor
      });
      setShopName('');
      setCategory('');
      setFloor('');
    } catch (err) {
      console.error("Error adding shop: ", err);
      setError('Error adding shop. Please try again.');
    }
  };

  return (
    <div>
      <h2>Create Shop</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Shop Name:</label>
          <input
            value={shopName}
            onChange={(e) => setShopName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Category:</label>
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Floor:</label>
          <input
            value={floor}
            onChange={(e) => setFloor(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Shop</button>
      </form>
    </div>
  );
};

export default CreateShop;
