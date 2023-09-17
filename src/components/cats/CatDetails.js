import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { getSingleCat, updateCat } from '../../managers/CatManager'; // Import the updateCat function
import { Background } from '../background/Background';
import { EditCat } from './EditCat';
import { DeleteCat } from './DeleteCat';

export const CatDetails = ({ catId: catIdProp }) => {
  const [cat, setCat] = useState({});
  const { catId: catIdParam } = useParams();
  const catId = catIdProp || catIdParam;
  const user = JSON.parse(localStorage.getItem("kitty_user")); // Retrieve user info from local storage

  useEffect(() => {
    getSingleCat(catId).then((fetchedCat) => {
      setCat(fetchedCat);
    });
  }, [catId]);

  // Define a state to control the visibility of the EditCat and DeleteCat components
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Function to update the cat details and refresh
  const handleCatUpdate = (updatedCat) => {
    updateCat(cat.id, updatedCat)
      .then((response) => {
        if (response !== null) {
          // Cat updated successfully, you can handle success here
          console.log('Cat updated:', response);
          setCat(updatedCat); // Update the cat details in the component state
          setIsEditing(false); // Close the edit form
        } else {
          console.error('Failed to update cat.');
        }
      })
      .catch((error) => {
        console.error('Error updating cat:', error);
      });
  };

  return (
    <>
      <section className="post">
        <div className="user-list-name">Name: {cat.name}</div>
        <img src={cat.image} alt={cat.name} />
        <div className="cat-list-location">
          Location: {cat.location && <Link to={`/locations/${cat.location.id}`}>{cat.location.name}</Link>}
        </div>
        <div className="cat-list-name">Age: {cat.age}</div>
        <div className="cat-list-name">Sex: {cat.sex}</div>
        <div className="cat-list-name">Bio: {cat.bio}</div>
        <div className="cat-list-name">Adopted: {cat.adopted ? 'Yes' : 'No'}</div>
        <div>Gets along with cats: {cat.gets_along_with_cats ? 'Yes' : 'No'}</div>
        <div>Gets along with dogs: {cat.gets_along_with_dogs ? 'Yes' : 'No'}</div>
        <div>Gets along with children: {cat.gets_along_with_children ? 'Yes' : 'No'}</div>

        {/* Show Edit and Delete buttons only to staff members */}
        {user && user.staff && (
          <div>
            <button onClick={() => setIsEditing(true)}>Edit Cat</button>
            <button onClick={() => setIsDeleting(true)}>Delete Cat</button>
          </div>
        )}

        <Link to={`/cats`} className="cat-profile-button">
          Back to all Cats
        </Link>
      </section>

      {/* Render EditCat component if isEditing state is true */}
      {isEditing && (
        <EditCat cat={cat} onClose={() => setIsEditing(false)} onUpdate={handleCatUpdate} />
      )}

      {/* Render DeleteCat component if isDeleting state is true */}
      {isDeleting && <DeleteCat cat={cat} onClose={() => setIsDeleting(false)} />}

      <Background />
    </>
  );
};