import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getSingleLocation, getProductsByLocation } from '../../managers/LocationManager';

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
    <section className="post">
        <div className="location-list-name">Name: {location.name}</div>
        <div className="location-list-name">Address: {location.address}</div>
        <div className="location-list-name">Phone: {location.phone_number}</div>
        <div className="location-list-name">Opening Hours: {location.opening_hours}</div>
        <div className="location-list-name">Closing Hours: {location.closing_hours}</div>
        
        <h3>Cats at this Location:</h3>
        <ul>
          {location.cats && location.cats.map(cat => (
            <li key={cat.id}>
                <Link to={`/cats/${cat.id}`}>{cat.name}<img src={cat.image} alt={cat.name} /></Link>, {cat.age} years old
            </li>
          ))}
        </ul>

        <h3>Products available at this location:</h3>
        <ul>
          {products.map(product => (
            <li key={product.id}>
                {product.description} {/* Displaying product description without making it a link */}
                <img src={product.image} alt={product.description} />
            </li>
          ))}
        </ul>

        <Link to={`/locations`} className="location-profile-button">Back to all Locations</Link>
    </section>
  );
};
