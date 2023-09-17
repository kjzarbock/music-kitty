import React, { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import { getSingleProduct, updateProduct } from "../../managers/ProductManager";
import { getLocations } from "../../managers/LocationManager";
import "./Products.css";
import { Background } from "../background/Background";

export const ProductDetails = () => {
    const [product, setProduct] = useState(null); // Initialize product as null
    const [editable, setEditable] = useState(false);
    const [editedProduct, setEditedProduct] = useState({});
    const [error, setError] = useState(null);
    const [locations, setLocations] = useState([]);
    const { productId } = useParams();

    useEffect(() => {
        getSingleProduct(productId)
            .then(data => {
                setProduct(data);
                setEditedProduct(data);
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
    
    const handleEditSubmit = (e) => {
        const selectedLocationIds = editedProduct.locations.map(loc => loc.id);
    
        // Call the updateProduct function with the edited product data
        updateProduct(productId, { ...editedProduct, locations: selectedLocationIds })
            .then(updatedData => {
                setProduct(updatedData);
                setEditable(false);
            })
            .catch(err => {
                setError(err.message);
            });
    };

    return (
        <>
        {product !== null ? ( // Check if product is not null
            <div className="product-detail-page">
                <h1 className="product-detail-header">
                    {editable ? (
                        <input
                            type="text"
                            value={editedProduct.description}
                            onChange={(e) => setEditedProduct({ ...editedProduct, description: e.target.value })}
                        />
                    ) : (
                        product.description
                    )}
                </h1>
                <img src={product.image} alt={product.description} />
                <div className="product-price">
                    Price: $
                    {editable ? (
                        <input
                            type="number"
                            value={editedProduct.price}
                            onChange={(e) => setEditedProduct({ ...editedProduct, price: parseFloat(e.target.value) })}
                        />
                    ) : (
                        product.price?.toFixed(2)
                    )}
                </div>
                <div className="product-available-locations">
                    <strong>Available At:</strong>
                    {editable ? (
                        <select
                            multiple
                            value={editedProduct.locations.map(loc => loc.id)}
                            onChange={(e) => {
                                const selectedLocationIds = Array.from(e.target.selectedOptions, option => option.value);
                                const selectedLocations = locations.filter(loc => selectedLocationIds.includes(loc.id.toString()));
                                setEditedProduct({ ...editedProduct, locations: selectedLocations });
                            }}
                        >
                            {locations.map(location => (
                                <option key={location.id} value={location.id}>
                                    {location.name}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <ul>
                            {product.locations && product.locations.map(location => (
                                <li key={location.id}>
                                    <Link to={`/locations/${location.id}`}>
                                        {location.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                {editable ? (
                    <button onClick={handleEditSubmit}>Save</button>
                ) : (
                    <>
                        <button onClick={() => setEditable(true)}>Edit</button>
                        <Link to="/products" className="back-to-products">Back to Products</Link>
                    </>
                )}
            </div>
        ) : (
            <div>Loading...</div> // Display loading message while product is null
        )}
        <Background />
        </>
    );
};
