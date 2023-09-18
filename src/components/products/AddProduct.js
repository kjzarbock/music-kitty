import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../../managers/ProductManager";
import { getLocations } from "../../managers/LocationManager"; // Import getLocations function
import Select from "react-select"; // Import react-select
import "./AddProduct.css";

export const AddProduct = () => {
  const [product, setProduct] = useState({
    description: "",
    price: 0,
    image: "",
    locations: [], // Initialize locations as an empty array
  });

  const [locationOptions, setLocationOptions] = useState([]); // State to hold location options
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleLocationChange = (selectedOptions) => {
    // Extract the selected location values and update the product state
    const selectedLocations = selectedOptions.map((option) => option.value);
    setProduct({ ...product, locations: selectedLocations });
  };


const handleSubmit = (e) => {
  e.preventDefault();

  // Call addProduct with the product data
  addProduct(product)
    .then((response) => {
      // Handle the response as needed
      // For example, you can check if the product was successfully created
      if (response) {
        // Reload the page to see changes
        window.location.reload();
      } else {
        // Handle the error case
        console.error("Failed to create product.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

  useEffect(() => {
    // Fetch location options when the component mounts
    getLocations()
      .then((locations) => {
        // Transform the fetched locations into an array of options for react-select
        const locationOptions = locations.map((location) => ({
          value: location.id,
          label: location.name,
        }));
        setLocationOptions(locationOptions);
      })
      .catch((error) => {
        console.error("Error fetching locations:", error);
      });
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Description:
        <input
          type="text"
          name="description"
          value={product.description}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Price:
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Image URL:
        <input
          type="text"
          name="image"
          value={product.image}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Locations:
        <Select
          options={locationOptions}
          isMulti
          onChange={handleLocationChange}
          className="custom-select"
        />
      </label>
      <button type="submit">Add Product</button>
    </form>
  );
};
