const getAuthHeaders = () => ({
    "Authorization": `Token ${localStorage.getItem("auth_token")}`,
    "Content-Type": "application/json"
});

export const getAllProducts = () => {
    return fetch("http://localhost:8000/products", {
    headers: getAuthHeaders()
    })
    .then((response) => {
        if (response.ok) {
        return response.json();
        } else {
        throw new Error("Failed to fetch product.");
        }
    });
};

export const getSingleProduct = (productId) => {
    return fetch(`http://localhost:8000/product/${productId}`, {
    headers: getAuthHeaders()
    })
    .then(res => res.json());
};