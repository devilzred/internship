import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesCollection = collection(db, 'categories');
      const categoriesSnapshot = await getDocs(categoriesCollection);
      setCategories(categoriesSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    };
    fetchCategories();
  }, []);

  const addCategory = async () => {
    if (!newCategory) {
      setError('Category name is required');
      return;
    }
    setError('');
    try {
      const docRef = await addDoc(collection(db, 'categories'), { name: newCategory });
      setCategories([...categories, { id: docRef.id, name: newCategory }]);
      setNewCategory('');
    } catch (err) {
      console.error("Error adding category: ", err);
      setError('Error adding category. Please try again.');
    }
  };

  const deleteCategory = async (id) => {
    try {
      await deleteDoc(doc(db, 'categories', id));
      setCategories(categories.filter(category => category.id !== id));
    } catch (err) {
      console.error("Error deleting category: ", err);
      setError('Error deleting category. Please try again.');
    }
  };

  return (
    <div>
      <h2>Manage Categories</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
        placeholder="New Category Name"
        required
      />
      <button onClick={addCategory}>Add Category</button>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            {category.name}
            <button onClick={() => deleteCategory(category.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageCategories;
