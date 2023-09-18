import React, { useState, useEffect } from "react";
import { getProducts } from "../../managers/ProductManager";
import { Link } from 'react-router-dom';
import { AddProduct } from "./AddProduct";
import "./Products.css";
import { Background } from "../background/Background";
import { deleteProduct } from "../../managers/ProductManager";

export const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const user = JSON.parse(localStorage.getItem("kitty_user")); // Get the user data from localStorage

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

    const isStaff = user && user.staff; // Check if the user is staff

    const handleDeleteProduct = (productId) => {
        // Call deleteProduct to delete the product by ID
        deleteProduct(productId)
            .then(() => {
                // If deletion is successful, refresh the product list
                getProducts()
                    .then(data => {
                        setProducts(data);
                    })
                    .catch(error => {
                        setError(error.message);
                    });
            })
            .catch(error => {
                console.error("Error deleting product:", error);
            });
    };

    return (
        <>
        <div className="product-page-container">
            <h1 className="page-header">Product List</h1>
            {isStaff && <AddProduct />} 
            <div className="product-container">
                <ul className="product-list">
                    {products.map(product => (
                        <li key={product.id} className="product-list-item">
                            <img src={product.image} alt={product.description} />
                            <div className="product-description">{product.description}</div>
                            <div className="product-price">${product.price.toFixed(2)}</div>
                            {product.locations.length > 0 && (
                                <div className="product-available-locations">
                                    <strong>Available At:</strong>
                                    <ul>
                                        {product.locations.map(location => (
                                            <li key={location.id}>
                                                <Link to={`/locations/${location.id}`}>
                                                    {location.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            {isStaff && (
                                <div className="product-actions">
                                    <button
                                        className="delete-button"
                                        onClick={() => handleDeleteProduct(product.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
        <Background />
        </>
    );
};
