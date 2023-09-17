import React, { useState, useEffect } from 'react';
import { createAdoption } from '../../managers/ProfileAdoptionManager';
import { getCatsByLocation } from '../../managers/CatManager';
import { getLocations } from '../../managers/LocationManager'; // Import the function to fetch locations
import { Background } from '../background/Background';

export const AdoptionForm = () => {
  const [formData, setFormData] = useState({
    cat_id: '',
    adoption_date: '',
    status: 'pending'
  });
  const [cats, setCats] = useState([]);
  const [locations, setLocations] = useState([]); // State to hold locations
  const [selectedLocation, setSelectedLocation] = useState('');

  useEffect(() => {
    // Fetch locations
    getLocations()
      .then(setLocations)
      .catch((error) => {
        console.error("Failed to fetch locations:", error);
      });
  }, []);

  useEffect(() => {
    getCatsByLocation(selectedLocation)
      .then(setCats)
      .catch((error) => {
        console.error("Failed to fetch cats:", error);
      });
  }, [selectedLocation]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createAdoption(formData)
      .then(() => {
        alert('Adoption request submitted successfully!');
      })
      .catch((error) => {
        alert('Failed to submit adoption request:', error);
      });
  };

  return (
    <>
    <div>
    <form onSubmit={handleSubmit}>
      <label>
        Select Location:
        <select
          name="location"
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
        >
          <option value="" disabled>Select a location</option>
          {locations.map((location) => (
            <option key={location.id} value={location.name}>
              {location.name}
            </option>
          ))}
        </select>
      </label>
      <label>
        Select Cat:
        <select
          name="cat_id"
          value={formData.cat_id}
          onChange={handleChange}
          required
        >
          <option value="" disabled>Select a cat</option>
          {cats.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </label>
      <label>
        Adoption Request Date:
        <input
          type="date"
          name="adoption_date"
          value={formData.adoption_date}
          onChange={handleChange}
          required
        />
      </label>
            <label>
        Status:
        <input
            type="text"
            name="status"
            value={formData.status}
            readOnly  
        />
        </label>
      <button type="submit">Submit Adoption Request</button>
    </form>
    </div>
    <Background />
    </>
  );
};
