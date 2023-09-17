import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { getSingleCat, deleteCat } from '../../managers/CatManager';
import { Background } from '../background/Background';
import { EditCat } from './EditCat';
import './CatDetails.css';

export const CatDetails = ({ catId: catIdProp }) => {
  const [cat, setCat] = useState({});
  const { catId: catIdParam } = useParams();
  const catId = catIdProp || catIdParam;
  const user = JSON.parse(localStorage.getItem('kitty_user'));
  const navigate = useNavigate();

  useEffect(() => {
    getSingleCat(catId).then((fetchedCat) => {
      setCat(fetchedCat);
    });
  }, [catId]);

  const [isEditing, setIsEditing] = useState(false);

  const handleUpdateCat = (updatedCat) => {
    setCat(updatedCat);
    setIsEditing(false); 
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this cat?')) {
      deleteCat(cat.id)
        .then(() => {
          navigate('/cats');
        })
        .catch((error) => {
          console.error('Error deleting cat:', error);
        });
    }
  };

  return (
    <>
      <section className='post cat-details-container'>
        <div className='cat-details'>
          <div className='user-list-name'>Name: {cat.name}</div>
          <img src={cat.image} alt={cat.name} />
          <div className='cat-list-location'>
            Location: {cat.location && <Link to={`/locations/${cat.location.id}`}>{cat.location.name}</Link>}
          </div>
          <div className='cat-list-name'>Age: {cat.age}</div>
          <div className='cat-list-name'>Sex: {cat.sex}</div>
          <div className='cat-list-name'>Bio: {cat.bio}</div>
          <div className='cat-list-name'>Adopted: {cat.adopted ? 'Yes' : 'No'}</div>
          <div>Gets along with cats: {cat.gets_along_with_cats ? 'Yes' : 'No'}</div>
          <div>Gets along with dogs: {cat.gets_along_with_dogs ? 'Yes' : 'No'}</div>
          <div>Gets along with children: {cat.gets_along_with_children ? 'Yes' : 'No'}</div>
          
          {user && user.staff && (
            <div>
              <button onClick={() => setIsEditing(true)}>Edit Cat</button>
              <button onClick={handleDelete}>Delete Cat</button>
            </div>
          )}
          
          <Link to={`/profile-adoptions`} className='cat-profile-button'>Adopt this Cat!</Link>
          <br></br>
          <Link to={`/cats`} className='cat-profile-button'>View all of our Cats</Link>
        </div>
      </section>
      
      {isEditing && (
        <EditCat cat={cat} onClose={() => setIsEditing(false)} onUpdateCat={handleUpdateCat} />
      )}
      <Background />
    </>
  );
};