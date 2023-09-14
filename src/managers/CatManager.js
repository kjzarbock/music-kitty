const getAuthHeaders = () => {
    // Retrieve the kitty_user object from localStorage and parse it
    const user = JSON.parse(localStorage.getItem("kitty_user"));
    const token = user?.token;

    return {
        "Authorization": `Token ${token}`,
        "Content-Type": "application/json"
    };
};

export const getCats = () => {
    // Log the token before making the fetch call
    const tokenForLogging = JSON.parse(localStorage.getItem("kitty_user"))?.token;
    console.log('Token for getLocations:', tokenForLogging);

    return fetch("http://localhost:8000/cats", {
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

export const getSingleCat = (catId) => {
    // Log the token before making the fetch call
    const tokenForLogging = JSON.parse(localStorage.getItem("kitty_user"))?.token;
    console.log('Token for getSingleLocation:', tokenForLogging);

    return fetch(`http://localhost:8000/cats/${catId}`, {
    headers: getAuthHeaders()
    })
    .then(res => res.json());
};

const getCatsAtLocation = (locationId) => {
    return fetch(`http://localhost:8000/cats?locationId=${locationId}`, {
        headers: {
            "Content-Type": "application/json"
            // Include any other headers if needed, such as Authorization headers.
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Failed to fetch cats for location ID: ${locationId}`);
        }
        return response.json();
    })
    .then(data => {
        return data;  // This will be the list of cats for the given location.
    });
};
