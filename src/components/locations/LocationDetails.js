import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getSingleLocation, getProductsByLocation } from '../../managers/LocationManager';
import { Background } from '../background/Background';

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
    <h1 className="location-detail-header">{location.name}</h1>
    <section className="post">
      
        <div className="location-list-name">Address: {location.address}</div>
        <div className="location-list-name">Phone: {location.phone_number}</div>
        <div className="location-list-name">Opening Hours: {location.opening_hours}</div>
        <div className="location-list-name">Closing Hours: {location.closing_hours}</div>
        
        <h2>Cats at this Location:</h2>
        <ul>
          {location.cats && location.cats.map(cat => (
            <li key={cat.id}>
                <Link to={`/cats/${cat.id}`}>{cat.name}<img src={cat.image} alt={cat.name} /></Link>, {cat.age} years old
            </li>
          ))}
        </ul>

        <h2>Products available at this location:</h2>
        <ul>
          {products.map(product => (
            <li key={product.id}>
                {product.description} Price: ${product.price}
                <img src={product.image} alt={product.description} />
            </li>
          ))}
        </ul>

        <Link to={`/locations`} className="location-profile-button">Back to all Locations</Link>
    </section>
    <Background />
    </>
  );
};
