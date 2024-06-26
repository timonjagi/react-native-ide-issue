import { useState, useEffect } from 'react';
import { db } from '../../../firebase/config'; // Adjust the path as necessary

const useKennelData = () => {
  const [kennels, setKennels] = useState([] as any);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all kennels with their associated breeds
  const fetchKennels = async () => {
    setLoading(true);
    try {
      const response = await db.collection('kennels').get();
      const kennelsData = await Promise.all(response.docs.map(async doc => {
        const kennel: any = { id: doc.id, ...doc.data() };
        const breedsResponse = await db.collection('breeds').where('kennel_id', '==', doc.id).get();
        kennel.breeds = breedsResponse.docs.map(breedDoc => ({ id: breedDoc.id, ...breedDoc.data() }));
        return kennel;
      }));
      setKennels(kennelsData);
      setError(null);
    } catch (err: any) {
      setError(err.message);
      console.error("Error fetching kennels:", err);
    }
    setLoading(false);
  };

  // Add a new kennel
  const addKennel = async (kennel) => {
    try {
      const response = await db.collection('kennels').add(kennel);
      setKennels(prev => [...prev, { id: response.id, ...kennel }]);
    } catch (err: any) {
      setError(err.message);
      console.error("Error adding kennel:", err);
    }
  };

  // Update an existing kennel
  const updateKennel = async (id, updatedData) => {
    try {
      await db.collection('kennels').doc(id).update(updatedData);
      setKennels(prev => prev.map(kennel => kennel.id === id ? { ...kennel, ...updatedData } : kennel));
    } catch (err: any) {
      setError(err.message);
      console.error("Error updating kennel:", err);
    }
  };

  // Delete a kennel
  const deleteKennel = async (id) => {
    try {
      await db.collection('kennels').doc(id).delete();
      setKennels(prev => prev.filter(kennel => kennel.id !== id));
    } catch (err: any) {
      setError(err.message);
      console.error("Error deleting kennel:", err);
    }
  };

  // Fetch kennels initially and on demand
  useEffect(() => {
    fetchKennels();
  }, []);

  return { kennels, loading, error, addKennel, updateKennel, deleteKennel, fetchKennels };
};

export default useKennelData;