import React, { useState, useEffect } from 'react';
import { createAdoption } from '../../managers/ProfileAdoptionManager';
import { getCatsByLocation } from '../../managers/CatManager';
import { getLocations } from '../../managers/LocationManager';
import { Background } from '../background/Background';
import { Link } from 'react-router-dom';

export const AdoptionForm = () => {
  const [formData, setFormData] = useState({
    cat_id: '',
    adoption_date: '',
    status: 'pending'
  });
  const [cats, setCats] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [userInfo, setUserInfo] = useState(null);
  const [loadingUserInfo, setLoadingUserInfo] = useState(true);
  const [selectedCat, setSelectedCat] = useState(null); // Track the selected cat
  const [submittedCats, setSubmittedCats] = useState(new Set()); // New state variable

  useEffect(() => {
    // Fetch locations
    getLocations()
      .then(setLocations)
      .catch((error) => {
        console.error("Failed to fetch locations:", error);
      });

  }, []);

  useEffect(() => {
    const cat = cats.find((cat) => cat.id === parseInt(formData.cat_id));
    setSelectedCat(cat);
  }, [formData.cat_id, cats]);

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
    if (submittedCats.has(formData.cat_id)) {  // Check if this cat is already submitted
      alert("You've already submitted an adoption request for this cat!");
      return;
    }
  
    createAdoption(formData)
      .then(() => {
        // Get the selected cat's name
        const selectedCatName = selectedCat ? selectedCat.name : 'Unknown Cat';
        // Get the selected location's name
        const selectedLocationName = locations.find(location => location.name === selectedLocation)?.name || 'Unknown Location';
        // Display the alert with cat's name and location name
        alert(`Adoption request for ${selectedCatName} submitted successfully! You must make a reservation at ${selectedLocationName} to be approved to adopt by a staff member.`);
        setSubmittedCats(new Set([...submittedCats, formData.cat_id])); // Update the list of submitted cats
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
    {/* Display selected cat details if available */}
    {selectedCat && (
  <div>
    <h2>Cat Details about {selectedCat.name}</h2>
    {selectedCat.image && (
      <img
      src={selectedCat.image}
      alt={`Image of ${selectedCat.name}`}
      style={{ maxWidth: '100%' }}
      />
      )}
    {/* Display compatibility information */}
    <p>Age: {selectedCat.age}</p>
    <p>Sex: {selectedCat.sex}</p>
    <p>Bio: {selectedCat.bio}</p>
    <h3>Compatibility</h3>
    <p>Gets Along with Cats: {selectedCat.gets_along_with_cats ? 'Yes' : 'No'}</p>
    <p>Gets Along with Dogs: {selectedCat.gets_along_with_dogs ? 'Yes' : 'No'}</p>
    <p>Gets Along with Children: {selectedCat.gets_along_with_children ? 'Yes' : 'No'}</p>
    {/* Add more cat details as needed */}
  </div>
)}
    <div>
      <Link to="/my-adoptions">View My Adoption Requests</Link>
    </div>
    <Background />
    </>
  );
};
