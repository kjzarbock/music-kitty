const getAuthHeaders = () => {
    // Retrieve the kitty_user object from localStorage and parse it
    const user = JSON.parse(localStorage.getItem("kitty_user"));
    const token = user?.token;

    return {
        "Authorization": `Token ${token}`,
        "Content-Type": "application/json"
    };
};

export const getLocations = () => {
    return fetch("http://localhost:8000/locations", {
    headers: getAuthHeaders()
    })
    .then((response) => {
        if (response.ok) {
        return response.json();
        } else {
        throw new Error("Failed to fetch location.");
        }
    });
};

export const getSingleLocation = (locationId) => {
    return fetch(`http://localhost:8000/locations/${locationId}`, {
    headers: getAuthHeaders()
    })
    .then(res => res.json());
};

export const getProductsByLocation = (locationId) => {
    return fetch("http://localhost:8000/products", { 
        headers: getAuthHeaders() 
    })
    .then(res => res.json())
    .then(products => products.filter(product => 
        product.locations.some(location => location.id === parseInt(locationId))
    ));
}

