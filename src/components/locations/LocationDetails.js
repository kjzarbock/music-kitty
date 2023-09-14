import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { getSingleLocation } from '../../managers/LocationManager';
import "./Locations.css";


export const LocationDetails = ({ locationId: locationIdProp }) => {
  const [location, setLocation] = useState({});
  const { locationId: locationIdParam } = useParams();
  const locationId = locationIdProp || locationIdParam;

  useEffect(() => {
    getSingleLocation(locationId)
      .then(setLocation);
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

        <Link to={`/locations`} className="location-profile-button">Back to all Locations</Link>
    </section>
  );
};
