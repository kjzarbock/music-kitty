import React, { useState, useEffect } from "react";
import { getProducts } from "../../managers/ProductManager";
import { Link } from 'react-router-dom';
import "./Products.css";

export const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        getProducts()
            .then(data => {
                setProducts(data);
            })
            .catch(error => {
                setError(error.message);
            });
    }, []);

    if (error) {
        return <div>Error loading products: {error}</div>;
    }

    return (
        <div className="product-page-container">
            <h1 className="page-header">Product List</h1>
            <div className="product-container">
                <ul className="product-list">
                    {products.map(product => (
                        <li key={product.id} className="product-list-item">
                            <img src={product.image} alt={product.description} />
                            <div className="product-description">{product.description}</div>
                            <div className="product-price">${product.price.toFixed(2)}</div>
                            <div className="product-available-locations">
                                <strong>Available At:</strong>
                                
                                    {product.locations.map(location => (
                                        <li key={location.id}>
                                            <Link to={`/locations/${location.id}`}>
                                                {location.name}
                                            </Link> 
                                        </li>
                                    ))}
                            
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
