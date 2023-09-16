import React, { useState, useEffect } from 'react';
import { addCat } from "../../managers/CatManager";
import { getLocations } from "../../managers/LocationManager";
import PropTypes from 'prop-types'; // Import PropTypes

export const CatForm = ({ onCatAdded }) => {
  const [newCat, setNewCat] = useState({
    location: "",
    name: "",
    image: "",
    age: "",
    sex: "",
    bio: "",
    adopted: false,
    gets_along_with_cats: false,
    gets_along_with_dogs: false,
    gets_along_with_children: false
  });

  CatForm.propTypes = {
    onCatAdded: PropTypes.func.isRequired, // Ensure onCatAdded is a function and is required
  };

  const [locations, setLocations] = useState([]);  // State to hold locations

  useEffect(() => {
    getLocations().then(fetchedLocations => {
      setLocations(fetchedLocations);
    });
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    // If the input is a checkbox, set the value to true or false based on checked state
    const newValue = type === 'checkbox' ? checked : value;
    setNewCat({
      ...newCat,
      [name]: newValue,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addCat(newCat).then((addedCat) => {
      onCatAdded(addedCat);  // Call the callback function
    });
  };


  return (
    <>
    <h1>Add a Cat</h1>
    <form onSubmit={handleSubmit} className="cat-form">
        <select name="location" onChange={handleChange}>
            <option value="" disabled defaultValue>Select Location</option>
            {locations.map(location => (
                <option key={location.id} value={location.id}>
                {location.name}
                </option>
            ))}
            </select>
      <input type="text" name="name" placeholder="Name" onChange={handleChange} />
      <input type="text" name="image" placeholder="Image URL" onChange={handleChange} />
      <input type="number" name="age" placeholder="Age" onChange={handleChange} />
      <input type="text" name="sex" placeholder="Sex" onChange={handleChange} />
      <textarea name="bio" placeholder="Bio" onChange={handleChange}></textarea>
      <input
  type="checkbox"
  name="adopted"
  value={newCat.adopted} // Set value to the current value of newCat.adopted
  onChange={handleChange}
/> Adopted
<input
  type="checkbox"
  name="gets_along_with_cats"
  value={newCat.gets_along_with_cats} // Set value to the current value of newCat.gets_along_with_cats
  onChange={handleChange}
/> Gets along with cats
<input
  type="checkbox"
  name="gets_along_with_dogs"
  value={newCat.gets_along_with_dogs} // Set value to the current value of newCat.gets_along_with_dogs
  onChange={handleChange}
/> Gets along with dogs
<input
  type="checkbox"
  name="gets_along_with_children"
  value={newCat.gets_along_with_children} // Set value to the current value of newCat.gets_along_with_children
  onChange={handleChange}
/> Gets along with children
      <button type="submit">Add Cat</button>
    </form>
    </>
  );
};
