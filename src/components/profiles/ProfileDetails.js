import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getSingleProfile } from '../../managers/ProfileManager';
import './Profiles.css'; // Import your CSS file for styling

export const ProfileDetails = () => {
  const { profileId } = useParams();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getSingleProfile(profileId)
      .then((data) => setProfile(data))
      .catch((error) => setError(error));
  }, [profileId]);

  if (error) {
    return <div>Error loading profile: {error.message}</div>;
  }

  if (!profile) {
    return <div>Loading profile...</div>;
  }

  const { user, image, bio, has_cats, has_dogs, has_children, approved_to_adopt } = profile;

  return (
    <div className="profile-details-container">
      <h1 className="profile-header">Profile Details</h1>
      <div className="profile-content">
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
        </div>
      </div>
    </div>
  );
};

