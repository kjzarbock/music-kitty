import React from 'react';
import { deleteCat } from '../../managers/CatManager';

export const DeleteCat = ({ cat, onClose }) => {
  const handleDelete = () => {
    deleteCat(cat.id)
      .then(() => {
        // Cat deleted successfully, you can handle success here
        console.log('Cat deleted');
        onClose(); // Close the delete confirmation
      })
      .catch((error) => {
        console.error('Error deleting cat:', error);
      });
  };

  return (
    <div className="delete-cat-confirmation">
      <h2>Delete Cat</h2>
      <p>Are you sure you want to delete the cat: {cat.name}?</p>
      <div className="delete-buttons">
        <button onClick={handleDelete}>Yes, Delete</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

