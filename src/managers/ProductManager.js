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

