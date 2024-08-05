import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";

const ManageShops = () => {
  const [shops, setShops] = useState([]);
  const [editShopId, setEditShopId] = useState(null);
  const [editShopName, setEditShopName] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [editFloor, setEditFloor] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchShops = async () => {
      const shopsCollection = collection(db, 'shops');
      const shopsSnapshot = await getDocs(shopsCollection);
      setShops(shopsSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    };
    fetchShops();
  }, []);

  const deleteShop = async (id) => {
    try {
      await deleteDoc(doc(db, 'shops', id));
      setShops(shops.filter(shop => shop.id !== id));
    } catch (err) {
      console.error("Error deleting shop: ", err);
      setError('Error deleting shop. Please try again.');
    }
  };

  const editShop = (shop) => {
    setEditShopId(shop.id);
    setEditShopName(shop.name);
    setEditCategory(shop.category);
    setEditFloor(shop.floor);
  };

  const updateShop = async () => {
    if (!editShopName || !editCategory || !editFloor) {
      setError('All fields are required');
      return;
    }
    setError('');
    try {
      await updateDoc(doc(db, 'shops', editShopId), {
        name: editShopName,
        category: editCategory,
        floor: editFloor
      });
      setShops(shops.map(shop => (shop.id === editShopId ? { id: editShopId, name: editShopName, category: editCategory, floor: editFloor } : shop)));
      setEditShopId(null);
      setEditShopName('');
      setEditCategory('');
      setEditFloor('');
    } catch (err) {
      console.error("Error updating shop: ", err);
      setError('Error updating shop. Please try again.');
    }
  };

  return (
    <div>
      <h2>Manage Shops</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {shops.map((shop) => (
          <li key={shop.id}>
            {shop.name} - {shop.category} - {shop.floor}
            <button onClick={() => deleteShop(shop.id)}>Delete</button>
            <button onClick={() => editShop(shop)}>Edit</button>
          </li>
        ))}
      </ul>
      {editShopId && (
        <div>
          <h3>Edit Shop</h3>
          <input
            value={editShopName}
            onChange={(e) => setEditShopName(e.target.value)}
            placeholder="Shop Name"
            required
          />
          <input
            value={editCategory}
            onChange={(e) => setEditCategory(e.target.value)}
            placeholder="Category"
            required
          />
          <input
            value={editFloor}
            onChange={(e) => setEditFloor(e.target.value)}
            placeholder="Floor"
            required
          />
          <button onClick={updateShop}>Update Shop</button>
        </div>
      )}
    </div>
  );
};

export default ManageShops;
