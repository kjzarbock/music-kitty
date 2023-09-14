import React, { useState, useEffect } from 'react';
import { getCats } from "../../managers/CatManager";
import { Link } from 'react-router-dom';

export const CatList = () => {
    const [cats, setCats] = useState([]);

    useEffect(() => {
        // Fetch the list of cats on component mount
        getCats().then(fetchedCats => {
            setCats(fetchedCats);
        });
    }, []);  // The empty dependency array ensures this useEffect runs only once

    return (
        <div>
            <h2>List of Cats</h2>
            <ul>
                {cats.map(cat => (
                    <li key={cat.id}>
                        <h3>{cat.name}</h3>
                        <img src={cat.image} alt={cat.name} />
                        <p>Age: {cat.age}</p>
                        <p>Sex: {cat.sex}</p>
                        <p>Bio: {cat.bio}</p>
                        <p>Adopted: {cat.adopted ? 'Yes' : 'No'}</p>
                        <p>Gets along with cats: {cat.gets_along_with_cats ? 'Yes' : 'No'}</p>
                        <p>Gets along with dogs: {cat.gets_along_with_dogs ? 'Yes' : 'No'}</p>
                        <p>Gets along with children: {cat.gets_along_with_children ? 'Yes' : 'No'}</p>
                        <Link to={`/cats/${cat.id}`} className="location-profile-button">View Cat Details</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

