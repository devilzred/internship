import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";
import { Timestamp } from "firebase/firestore";

const ManageOffers = () => {
  const [offers, setOffers] = useState([]);
  const [newOffer, setNewOffer] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOffers = async () => {
      const offersCollection = collection(db, 'offers');
      const offersSnapshot = await getDocs(offersCollection);
      setOffers(offersSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id, timestamp: doc.data().timestamp?.toDate().toString() })));
    };
    fetchOffers();
  }, []);

  const addOffer = async () => {
    if (!newOffer) {
      setError('Offer name is required');
      return;
    }
    setError('');
    const timestamp = Timestamp.now();
    try {
      const docRef = await addDoc(collection(db, 'offers'), { name: newOffer, timestamp });
      setOffers([...offers, { id: docRef.id, name: newOffer, timestamp: timestamp.toDate().toString() }]);
      setNewOffer('');
    } catch (err) {
      console.error("Error adding offer: ", err);
      setError('Error adding offer. Please try again.');
    }
  };

  const deleteOffer = async (id) => {
    try {
      await deleteDoc(doc(db, 'offers', id));
      setOffers(offers.filter(offer => offer.id !== id));
    } catch (err) {
      console.error("Error deleting offer: ", err);
      setError('Error deleting offer. Please try again.');
    }
  };

  return (
    <div>
      <h2>Manage Offers</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        value={newOffer}
        onChange={(e) => setNewOffer(e.target.value)}
        placeholder="New Offer Name"
        required
      />
      <button onClick={addOffer}>Add Offer</button>
      <ul>
        {offers.map((offer) => (
          <li key={offer.id}>
            {offer.name} - {offer.timestamp}
            <button onClick={() => deleteOffer(offer.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageOffers;
