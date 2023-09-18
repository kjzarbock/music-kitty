import React, { useState, useEffect } from 'react';
import { getProfiles } from '../../managers/ProfileManager';
import { Link } from 'react-router-dom';
import './Profiles.css'; // Import your CSS file for styling
import { MyProfile } from './MyProfile';
import { Background } from '../background/Background';

export const ProfileList = () => {
  const [profiles, setProfiles] = useState([]);
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const [isStaff, setIsStaff] = useState(false);

  useEffect(() => {
    getProfiles()
      .then((data) => {
        setProfiles(data);
        setFilteredProfiles(data);
        const localUser = JSON.parse(localStorage.getItem("kitty_user"));
        setIsStaff(localUser?.staff || false);
      })
      .catch((error) => setError(error));
  }, []);

  useEffect(() => {
    setFilteredProfiles(
      profiles.filter(profile =>
        `${profile.user.first_name} ${profile.user.last_name}`.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, profiles]);

  if (error) {
    return <div>Error loading profiles: {error.message}</div>;
  }

  if (isStaff) {
    return (
      <>
        <div className="profile-page-container">
          <h1 className="page-header">Profile List</h1>
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="profile-search-bar" // You can style this class in your CSS
          />
          <div className="profile-container">
            <ul className="profile-list">
              {filteredProfiles.map(({ user, image, bio, has_cats, has_dogs, has_children, approved_to_adopt }) => (
                <li key={user.id} className="profile-list-item">
                  <div className="profile-item-content">
                    <img src={image} alt={`Profile of ${user.first_name}`} className="profile-image" />
                    <div className="profile-details">
                      <div className="profile-name">{user.first_name} {user.last_name}</div>
                      <div className="profile-email">Email: {user.email}</div>
                      <div className="profile-username">Username: {user.username}</div>
                      <div className="profile-bio">Bio: {bio}</div>
                      <div className="profile-has-cats">Has Cats: {has_cats ? 'Yes' : 'No'}</div>
                      <div className="profile-has-dogs">Has Dogs: {has_dogs ? 'Yes' : 'No'}</div>
                      <div className="profile-has-children">Has Children: {has_children ? 'Yes' : 'No'}</div>
                      <div className="profile-approved">Approved to Adopt: {approved_to_adopt ? 'Yes' : 'No'}</div>
                      <div className="profile-staff">Staff: {user.is_staff ? 'Yes' : 'No'}</div>
                      <Link to={`/profiles/${user.id}`} className="location-profile-button">View Profile</Link>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Background />
      </>
    );
  } else {
    return <MyProfile />
  }
};
