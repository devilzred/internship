import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";

const ManageFloors = () => {
  const [floors, setFloors] = useState([]);
  const [newFloor, setNewFloor] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFloors = async () => {
      const floorsCollection = collection(db, 'floors');
      const floorsSnapshot = await getDocs(floorsCollection);
      setFloors(floorsSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    };
    fetchFloors();
  }, []);

  const addFloor = async () => {
    if (!newFloor) {
      setError('Floor name is required');
      return;
    }
    setError('');
    try {
      const docRef = await addDoc(collection(db, 'floors'), { name: newFloor });
      setFloors([...floors, { id: docRef.id, name: newFloor }]);
      setNewFloor('');
    } catch (err) {
      console.error("Error adding floor: ", err);
      setError('Error adding floor. Please try again.');
    }
  };

  const deleteFloor = async (id) => {
    try {
      await deleteDoc(doc(db, 'floors', id));
      setFloors(floors.filter(floor => floor.id !== id));
    } catch (err) {
      console.error("Error deleting floor: ", err);
      setError('Error deleting floor. Please try again.');
    }
  };

  return (
    <div>
      <h2>Manage Floors</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        value={newFloor}
        onChange={(e) => setNewFloor(e.target.value)}
        placeholder="New Floor Name"
        required
      />
      <button onClick={addFloor}>Add Floor</button>
      <ul>
        {floors.map((floor) => (
          <li key={floor.id}>
            {floor.name}
            <button onClick={() => deleteFloor(floor.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageFloors;
