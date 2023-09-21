import React, { useState, useEffect } from 'react';
import { getCats } from "../../managers/CatManager";
import { CatForm } from './CatForm';  
import { Link } from 'react-router-dom';
import { Background } from '../background/Background';
import { getLocations } from "../../managers/LocationManager"; 
import './CatForm.css';

export const CatList = () => {
  const [cats, setCats] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); 
  const [locations, setLocations] = useState([]); 
  const user = JSON.parse(localStorage.getItem("kitty_user"));

  useEffect(() => {
    getCats().then(fetchedCats => {
      setCats(fetchedCats);
    });

    getLocations().then(fetchedLocations => {
      setLocations(fetchedLocations);
    });
  }, []);

  const handleCatAdded = (newCat) => {
    setCats([...cats, newCat]);  
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); 
  };

  const filteredCats = cats.filter(cat => {
    return (
      cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cat.location.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <>
      <div className="cat-list-container">
        {user && user.staff ? <CatForm onCatAdded={handleCatAdded} /> : null} 
        <h2>All of Our Music Kitty Cats!</h2>
        <input
          type="text"
          placeholder="Search by name or location"
          value={searchTerm}
          onChange={handleSearchChange}
          className="cat-search-input"
        />
        <h3>Our Locations</h3>
        <ul className="location-list">
          {locations.map(location => (
            <li key={location.id}>
              {location.name}
            </li>
          ))}
        </ul>
        <div className="cat-grid">
          {filteredCats.map(cat => (
            <div className="cat-details" key={cat.id}>
              <h3 className="cat-name">{cat.name}</h3>
              <img src={cat.image} alt={cat.name} className="cat-image"/>
              <p>Location: {cat.location && <Link to={`/locations/${cat.location.id}`}>{cat.location.name}</Link>}</p>
              <p>Age: {cat.age}</p>
              <p>Sex: {cat.sex}</p>
              <p>Bio: {cat.bio}</p>
              <p>Adopted: {cat.adopted ? 'Yes' : 'No'}</p>
              <p>Gets along with cats: {cat.gets_along_with_cats ? 'Yes' : 'No'}</p>
              <p>Gets along with dogs: {cat.gets_along_with_dogs ? 'Yes' : 'No'}</p>
              <p>Gets along with children: {cat.gets_along_with_children ? 'Yes' : 'No'}</p>
              <Link to={`/cats/${cat.id}`} className="cat-profile-button">View Cat Details</Link>
            </div>
          ))}
        </div>
      </div>
      <Background />
    </>
  );
};
