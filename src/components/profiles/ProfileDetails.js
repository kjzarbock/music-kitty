import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getSingleProfile, updateUserProfile, toggleStaffStatus } from '../../managers/ProfileManager'; // Import your update function
import { Link } from 'react-router-dom';
import './Profiles.css';
import { Background } from '../background/Background';

export const ProfileDetails = () => {
  const { profileId } = useParams();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  const fetchProfile = () => {
    getSingleProfile(profileId)
      .then((data) => setProfile(data))
      .catch((error) => setError(error));
  };

  useEffect(() => {
    fetchProfile();
  }, [profileId]);

  const handleApprovalToggle = () => {
    const updatedProfile = { ...profile, approved_to_adopt: !profile.approved_to_adopt };
    updateUserProfile(profileId, updatedProfile)
      .then(() => {
        fetchProfile();  // Re-fetch the profile to update the UI
      })
      .catch((error) => {
        console.error("Failed to update profile:", error);
      });
  };

const handleStaffToggle = () => {
  toggleStaffStatus(profileId)
    .then(() => {
      fetchProfile();  // Re-fetch the profile to update the UI
    })
    .catch((error) => {
      console.error("Failed to update staff status:", error);
    });
};

  if (error) {
    return <div>Error loading profile: {error.message}</div>;
  }

  if (!profile) {
    return <div>Loading profile...</div>;
  }

  const { user, image, bio, has_cats, has_dogs, has_children, approved_to_adopt } = profile;

  return (
    <>
      <div className="profile-details-container">
        <h1 className="profile-header">Profile Details</h1>
        <div className="profile-content">
          <div className="profile-details">
          <img src={image} alt={`Profile of ${user.first_name}`} className="profile-image" />
            <div className="profile-name">{user.first_name} {user.last_name}</div>
            <div className="profile-email">Email: {user.email}</div>
            <div className="profile-username">Username: {user.username}</div>
            <div className="profile-bio">Bio: {bio}</div>
            <div className="profile-has-cats">Has Cats: {has_cats ? 'Yes' : 'No'}</div>
            <div className="profile-has-dogs">Has Dogs: {has_dogs ? 'Yes' : 'No'}</div>
            <div className="profile-has-children">Has Children: {has_children ? 'Yes' : 'No'}</div>
            <div className="profile-approved">Approved to Adopt: {approved_to_adopt ? 'Yes' : 'No'}</div>
            <button onClick={handleApprovalToggle}>Toggle Approval</button>
            <div className="profile-staff">Is Staff: {profile.user.is_staff ? 'Yes' : 'No'}</div>
            <button onClick={handleStaffToggle}>Toggle Staff Status</button>
            <br></br>
            <Link to="/profiles" className="location-profile-button">View Profiles</Link>
          </div>
        </div>
      </div>
      <Background />
    </>
  );
};
