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
    // Log the token before making the fetch call
    const tokenForLogging = JSON.parse(localStorage.getItem("kitty_user"))?.token;
    console.log('Token for getLocations:', tokenForLogging);

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
    // Log the token before making the fetch call
    const tokenForLogging = JSON.parse(localStorage.getItem("kitty_user"))?.token;
    console.log('Token for getSingleLocation:', tokenForLogging);

    return fetch(`http://localhost:8000/locations/${locationId}`, {
    headers: getAuthHeaders()
    })
    .then(res => res.json());
};

