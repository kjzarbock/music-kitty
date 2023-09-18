import React, { useState } from 'react';
import { updateCat } from '../../managers/CatManager';

export const EditCat = ({ cat, onClose, onUpdateCat }) => {
  const [updatedCat, setUpdatedCat] = useState({ ...cat });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setUpdatedCat({
      ...updatedCat,
      [name]: newValue,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Create the correct payload with the 'id' field
    const updatedCatPayload = {
      id: updatedCat.id, // Ensure 'id' is included
      location: updatedCat.location.id, // Assuming 'location' is an object with an 'id' field
      name: updatedCat.name,
      image: updatedCat.image,
      age: updatedCat.age,
      sex: updatedCat.sex,
      bio: updatedCat.bio,
      adopted: updatedCat.adopted,
      gets_along_with_cats: updatedCat.gets_along_with_cats,
      gets_along_with_dogs: updatedCat.gets_along_with_dogs,
      gets_along_with_children: updatedCat.gets_along_with_children,
    };
  
    console.log('updatedCatPayload:', updatedCatPayload);
  
    updateCat(cat.id, updatedCatPayload)
      .then((response) => {
        if (response !== null) {
          onUpdateCat(updatedCatPayload);
          onClose(); 
        } else {
          console.error('Error updating cat.');
        }
      })
      .catch((error) => {
        console.error('Error updating cat:', error);
      });
      window.location.reload();
    };
  
  return (
    <div className="edit-cat-form">
      <h2>Edit Cat</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={updatedCat.name}
          onChange={handleInputChange}
        />
        <label>Image URL:</label>
        <input
          type="text"
          name="image"
          value={updatedCat.image}
          onChange={handleInputChange}
        />
        <label>Age:</label>
        <input
          type="number"
          name="age"
          value={updatedCat.age}
          onChange={handleInputChange}
        />
        <label>Sex:</label>
        <input
          type="text"
          name="sex"
          value={updatedCat.sex}
          onChange={handleInputChange}
        />
        <label>Bio:</label>
        <textarea
          name="bio"
          value={updatedCat.bio}
          onChange={handleInputChange}
        ></textarea>
        <label>
          Adopted:
          <input
            type="checkbox"
            name="adopted"
            checked={updatedCat.adopted}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Gets along with cats:
          <input
            type="checkbox"
            name="gets_along_with_cats"
            checked={updatedCat.gets_along_with_cats}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Gets along with dogs:
          <input
            type="checkbox"
            name="gets_along_with_dogs"
            checked={updatedCat.gets_along_with_dogs}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Gets along with children:
          <input
            type="checkbox"
            name="gets_along_with_children"
            checked={updatedCat.gets_along_with_children}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Save Changes</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
};
