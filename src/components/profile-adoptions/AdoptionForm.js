import React, { useState, useEffect } from 'react';
import { createAdoption } from '../../managers/ProfileAdoptionManager';
import { getCatsByLocation } from '../../managers/CatManager';
import { getLocations } from '../../managers/LocationManager';
import { AdoptionList } from './AdoptionList'; 
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

  useEffect(() => {
    // Fetch locations
    getLocations()
      .then(setLocations)
      .catch((error) => {
        console.error("Failed to fetch locations:", error);
      });

    // Fetch user info
    const localUser = JSON.parse(localStorage.getItem("kitty_user"));
    const token = localUser?.token;
    if (token) {
      fetch(`http://localhost:8000/profiles/me/`, {
        method: "GET",
        headers: {
          "Authorization": `Token ${token}`,
          "Content-Type": "application/json"
        }
      })
      .then(res => res.json())
      .then(data => {
        setUserInfo(data);
        setLoadingUserInfo(false);
      })
      .catch(error => {
        console.error("Error fetching user information:", error);
        setUserInfo(localUser);
        setLoadingUserInfo(false);
      });
    } else {
      setUserInfo(localUser);
      setLoadingUserInfo(false);
    }
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
        alert('Adoption request submitted successfully! You must make a reservation to meet with staff to be approved to adopt.');
      })
      .catch((error) => {
        alert('Failed to submit adoption request:', error);
      });
  };

  if (loadingUserInfo) {
    return <div>Loading...</div>;
  }

  if (userInfo?.user?.is_staff) {
    return <AdoptionList />;
  } else {
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
      <div>
        <Link to="/my-adoptions">View My Reservations</Link>
        </div>
      <Background />
      </>
    );
  }
};
