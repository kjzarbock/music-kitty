import React, { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import { getSingleProduct } from "../../managers/ProductManager";
import "./Products.css";

export const ProductDetails = () => {
    const [product, setProduct] = useState({});
    const [error, setError] = useState(null);
    const { productId } = useParams(); // Destructuring the productId from the URL params

    useEffect(() => {
        getSingleProduct(productId)
            .then(data => {
                setProduct(data);
            })
            .catch(err => {
                setError(err.message);
            });
    }, [productId]);

    if (error) {
        return <div>Error loading product details: {error}</div>;
    }

    return (
        <div className="product-detail-page">
            <h1 className="product-detail-header">{product.description}</h1>
            <img src={product.image} alt={product.description} />
            <div className="product-price">Price: ${product.price?.toFixed(2)}</div>
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
    );
};
