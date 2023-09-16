import React, { useState, useEffect } from 'react';
import { getCats } from "../../managers/CatManager";
import { CatForm } from './CatForm';  // Import the CatForm component
import { Link } from 'react-router-dom';
import { Background } from '../background/Background';
import { getLocations } from "../../managers/LocationManager"; // Import the getLocations function
import './CatForm.css';

export const CatList = () => {
  const [cats, setCats] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [locations, setLocations] = useState([]); // State for locations
  const user = JSON.parse(localStorage.getItem("kitty_user")); // Retrieve user info from local storage

  useEffect(() => {
    getCats().then(fetchedCats => {
      setCats(fetchedCats);
    });

    getLocations().then(fetchedLocations => {
      setLocations(fetchedLocations);
    });
  }, []);

  const handleCatAdded = (newCat) => {
    setCats([...cats, newCat]);  // Update the list of cats
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); // Update search term state
  };

  const filteredCats = cats.filter(cat => {
    // Check if the cat's name or location name contains the search term (case insensitive)
    return (
      cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cat.location.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <>
      <div>
        {user && user.staff ? <CatForm onCatAdded={handleCatAdded} /> : null} 
        <h2>List of Cats</h2>
        <input
          type="text"
          placeholder="Search by name or location"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <h3>Our Locations</h3>
        <ul>
          {locations.map(location => (
            <li key={location.id}>
              {location.name}
            </li>
          ))}
        </ul>
        <ul>
          {filteredCats.map(cat => (
            <li key={cat.id}>
              <h3>{cat.name}</h3>
              <img src={cat.image} alt={cat.name} />
              <p>Location: {cat.location && <Link to={`/locations/${cat.location.id}`}>{cat.location.name}</Link>}</p>
              <p>Age: {cat.age}</p>
              <p>Sex: {cat.sex}</p>
              <p>Bio: {cat.bio}</p>
              <p>Adopted: {cat.adopted ? 'Yes' : 'No'}</p>
              <p>Gets along with cats: {cat.gets_along_with_cats ? 'Yes' : 'No'}</p>
              <p>Gets along with dogs: {cat.gets_along_with_dogs ? 'Yes' : 'No'}</p>
              <p>Gets along with children: {cat.gets_along_with_children ? 'Yes' : 'No'}</p>
              <Link to={`/cats/${cat.id}`} className="location-profile-button">View Cat Details</Link>
            </li>
          ))}
        </ul>
      </div>
      <Background />
    </>
  );
};
