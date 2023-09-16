import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMyProfile, updateMyProfile } from '../../managers/ProfileManager';
import './Profiles.css';
import { Link } from 'react-router-dom';
import { Background } from '../background/Background';

export const MyProfile = () => {
  const { profileId } = useParams();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    getMyProfile(profileId)
      .then((data) => setProfile(data))
      .catch((error) => setError(error));
  }, [profileId]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    // Use type to check if it's a checkbox input
    const newValue = type === 'checkbox' ? checked : value;

    setFormData({
      ...formData,
      [name]: newValue === 'on' ? true : newValue, // Convert "on" to true, leave other values as is
    });
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setFormData({
      bio: profile.bio,
      has_cats: profile.has_cats,
      has_dogs: profile.has_dogs,
      has_children: profile.has_children,
      image: profile.image, // Include the image in the form data
    });
  };

  const handleSaveClick = () => {
    const updatedData = {
      bio: formData.bio,
      has_cats: formData.has_cats,
      has_dogs: formData.has_dogs,
      has_children: formData.has_children,
      image: formData.image, // Include the image in the payload
    };

    updateMyProfile(profileId, updatedData) // Send a PUT request to update the profile
      .then(() => {
        setIsEditing(false);
        // Reload the profile data to display the updated information
        getMyProfile(profileId)
          .then((data) => setProfile(data))
          .catch((error) => setError(error));
      })
      .catch((error) => setError(error));
  };

  if (error) {
    return <div>Error loading profile: {error.message}</div>;
  }

  if (!profile) {
    return <div>Loading profile...</div>;
  }

  const { user, image, bio, has_cats, has_dogs, has_children } = profile;

  return (
    <>
    <div className="profile-details-container">
      <h1 className="profile-header">Profile Details</h1>
      <div className="profile-content">
        <img src={image} alt={`Profile of ${user.first_name}`} className="profile-image" />
        <div className="profile-details">
          <div className="profile-name">{user.first_name} {user.last_name}</div>
          <div className="profile-email">Email: {user.email}</div>
          <div className="profile-username">Username: {user.username}</div>

          {isEditing ? ( // Display the edit form when in edit mode
            <div>
              <label htmlFor="bio">Bio:</label>
              <input type="text" name="bio" value={formData.bio || ''} onChange={handleInputChange} />
              <label htmlFor="has_cats">Has Cats:</label>
              <input type="checkbox" name="has_cats" checked={formData.has_cats || false} onChange={handleInputChange} />
              <label htmlFor="has_dogs">Has Dogs:</label>
              <input type="checkbox" name="has_dogs" checked={formData.has_dogs || false} onChange={handleInputChange} />
              <label htmlFor="has_children">Has Children:</label>
              <input type="checkbox" name="has_children" checked={formData.has_children || false} onChange={handleInputChange} />
              <label htmlFor="image">Image URL:</label> {/* Add an input for the image URL */}
              <input type="text" name="image" value={formData.image || ''} onChange={handleInputChange} />
              <button onClick={handleSaveClick}>Save</button> {/* Show the "Save" button */}
            </div>
          ) : (
            <div>
              <div className="profile-bio">Bio: {bio}</div>
              <div className="profile-has-cats">Has Cats: {has_cats ? 'Yes' : 'No'}</div>
              <div className="profile-has-dogs">Has Dogs: {has_dogs ? 'Yes' : 'No'}</div>
              <div className="profile-has-children">Has Children: {has_children ? 'Yes' : 'No'}</div>
              <div className="profile-approved">Approved to Adopt: {profile.approved_to_adopt ? 'Yes' : 'No'}</div>
              <button onClick={handleEditClick}>Edit</button> {/* Show the "Edit" button */}
            </div>
          )}
          <Link to="/" className="location-profile-button">Back to Home</Link>
        </div>
      </div>
    </div>
    <Background />
    </>
  );
};
