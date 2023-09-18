import React, { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import { getSingleProduct } from "../../managers/ProductManager";
import { getLocations } from "../../managers/LocationManager";
import "./Products.css";
import { Background } from "../background/Background";

export const ProductDetails = () => {
    const [product, setProduct] = useState(null); // Initialize product as null
    const [error, setError] = useState(null);
    const [locations, setLocations] = useState([]);
    const { productId } = useParams();

    useEffect(() => {
        getSingleProduct(productId)
            .then(data => {
                setProduct(data);
            })
            .catch(err => {
                setError(err.message);
            });

        getLocations()
            .then(data => {
                setLocations(data);
            })
            .catch(err => {
                setError(err.message);
            });
    }, [productId]);

    if (error) {
        return <div>Error loading product details: {error}</div>;
    }
    
    return (
        <>
        {product !== null ? ( // Check if product is not null
            <div className="product-detail-page">
                <h1 className="product-detail-header">
                    {product.description}
                </h1>
                <img src={product.image} alt={product.description} />
                <div className="product-price">
                    Price: ${product.price?.toFixed(2)}
                </div>
                <div className="product-available-locations">
                    <strong>Available At:</strong>
                    <ul>
                        {product.locations && product.locations.map(location => (
                            <li key={location.id}>
                                <Link to={`/locations/${location.id}`}>
                                    {location.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <Link to="/products" className="back-to-products">Back to Products</Link>
            </div>
        ) : (
            <div>Loading...</div> // Display loading message while product is null
        )}
        <Background />
        </>
    );
};
