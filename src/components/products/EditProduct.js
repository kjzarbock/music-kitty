import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSingleProduct, updateProduct } from "../../managers/ProductManager";

export const EditProduct = () => {
  const { productId } = useParams(); // Get the productId from the route
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    description: "",
    price: 0,
    image: "",
    // Include other product properties here
  });

  useEffect(() => {
    // Fetch the product details for editing
    getSingleProduct(productId)
      .then((data) => {
        setProduct(data);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
      });
  }, [productId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleUpdate = () => {
    // Call updateProduct with the updated product data
    updateProduct(productId, product)
      .then(() => {
        // Redirect to the product list page or perform other actions
        navigate("/products");
      })
      .catch((error) => {
        console.error("Error updating product:", error);
      });
  };

  return (
    <div>
      <h2>Edit Product</h2>
      <form>
        {/* Populate and edit product details here */}
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={product.description}
            onChange={handleInputChange}
          />
        </label>
        {/* Include other product fields here */}
        <button type="button" onClick={handleUpdate}>
          Update
        </button>
      </form>
    </div>
  );
};

