const getAuthHeaders = () => {
    const user = JSON.parse(localStorage.getItem("kitty_user"));
    const token = user?.token;

    return {
        "Authorization": `Token ${token}`,
        "Content-Type": "application/json"
    };
};

export const getProducts = () => {
    return fetch("http://localhost:8000/products", {
    headers: getAuthHeaders()
    })
    .then((response) => {
        if (response.ok) {
        return response.json();
        } else {
        throw new Error("Failed to fetch products.");
        }
    });
};

export const getSingleProduct = (productId) => {
    return fetch(`http://localhost:8000/products/${productId}`, {
    headers: getAuthHeaders()
    })
    .then(res => res.json());
};

export const addProduct = (newProduct) => {
    return fetch("http://localhost:8000/products", {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(newProduct),
    })
    .then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Failed to create product.");
        }
    });
}

export const updateProduct = (productId, updatedProduct) => {
    return fetch(`http://localhost:8000/products/${productId}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(updatedProduct),
    })
    .then((response) => {
        if (response.ok) {
            if (response.status === 204) { // No Content
                return null;
            }
            return response.json();
        } else {
            throw new Error("Failed to update product.");
        }
    });
}

export const deleteProduct = (productId) => {
    return fetch(`http://localhost:8000/products/${productId}`, {
        method: "DELETE",
        headers: getAuthHeaders()
    })
    .then((response) => {
        if (response.status === 204) {
            // Deletion was successful, no JSON response
            return;
        }
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Failed to delete product.");
        }
    })
    .catch((error) => {
        console.error("Error deleting product:", error);
    });
}