import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { deleteProduct } from "../../managers/ProductManager";

export const DeleteProduct = () => {
  const { productId } = useParams(); // Get the productId from the route
  const navigate = useNavigate();

  const handleDelete = () => {
    // Call deleteProduct to delete the product
    deleteProduct(productId)
      .then(() => {
        // Redirect to the product list page or perform other actions
        navigate("/products");
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  };

  const handleCancel = () => {
    // Redirect to the product list page or other appropriate action
    navigate("/products");
  };

  return (
    <div>
      <h2>Delete Product</h2>
      <p>Are you sure you want to delete this product?</p>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={handleCancel}>Cancel</button>
    </div>
  );
};
