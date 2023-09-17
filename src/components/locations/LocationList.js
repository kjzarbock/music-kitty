import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { getLocations } from "../../managers/LocationManager";
import { Background } from "../background/Background";
import './Locations.css';

export const LocationList = () => {
    const [locations, setLocations] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        getLocations()
            .then(setLocations)
            .catch(setError);
    }, []);

    if (error) {
        return <div>Error loading locations: {error.message}</div>;
    }

    return (
        <>
        <div className="location-page-container">
            <h1 className="page-header">Location List</h1>
            <div className="location-container">
                <ul className="location-list">
                    {locations.map(({ id, name, address, phone_number, opening_hours, closing_hours }) => (
                        <li key={id} className="location-list-items">
                            <div className="location-list-name">Name: {name}</div>
                            <div className="location-list-address">Address: {address}</div>
                            <div className="location-list-phone">Phone: {phone_number}</div>
                            <div className="location-list-opening">Opening Hours: {opening_hours}</div>
                            <div className="location-list-closing">Closing Hours: {closing_hours}</div>
                            <Link to={`/locations/${id}`} className="location-profile-button">View Location</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
        <Background />
        </>
    );
};
