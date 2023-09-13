const getAuthHeaders = () => ({
    "Authorization": `Token ${localStorage.getItem("auth_token")}`,
    "Content-Type": "application/json"
});

export const getAllLocations = () => {
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

