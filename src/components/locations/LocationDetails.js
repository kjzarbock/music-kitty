import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getSingleLocation, getProductsByLocation } from '../../managers/LocationManager';
import { Background } from '../background/Background';
import './LocationDetails.css';

export const LocationDetails = ({ locationId: locationIdProp }) => {
  const [location, setLocation] = useState({});
  const [products, setProducts] = useState([]);
  const { locationId: locationIdParam } = useParams();
  const locationId = locationIdProp || locationIdParam;
  
  useEffect(() => {
    getSingleLocation(locationId)
    .then(setLocation);
    getProductsByLocation(locationId)
    .then(setProducts);
  }, [locationId]);
  
  return (
    <>
      <Link to={`/locations`} className="location-profile-button">Back to all Locations</Link>
      <h1 className="location-detail-header">{location.name}</h1>
      <section className="post">
        <div className="location-list-name">Address: {location.address}</div>
        <div className="location-list-name">Phone: {location.phone_number}</div>
        <div className="location-list-name">Opening Hours: {location.opening_hours}</div>
        <div className="location-list-name">Closing Hours: {location.closing_hours}</div>
        
        <h2 className="cat-header">Cats at this Location:</h2>
        <div className="cat-grid">
          {location.cats && location.cats.map(cat => (
            <div className="cat-item" key={cat.id}>
              <Link to={`/cats/${cat.id}`}>
                <img src={cat.image} alt={cat.name} />
                <div className="cat-name">{cat.name}</div> 
              </Link>
              <div>{cat.age} years old</div>
              <div>{cat.sex}</div>
              <div>{cat.bio}</div>
            </div>
          ))}
        </div>

        <h2>Products available at this location:</h2>
        <div className="product-grid">
          {products.map(product => (
            <div className="product-item" key={product.id}>
              <img src={product.image} alt={product.description} />
              {product.description} <br></br>Price: ${product.price}
            </div>
          ))}
        </div>
      </section>
      <Background />
    </>
  );
};
