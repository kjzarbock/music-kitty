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
    return fetch("http://localhost:8000/cats", {
    headers: getAuthHeaders()
    })
    .then((response) => {
        if (response.ok) {
        return response.json();
        } else {
        throw new Error("Failed to fetch cat.");
        }
    });
};

export const getSingleCat = (catId) => {
    return fetch(`http://localhost:8000/cats/${catId}`, {
    headers: getAuthHeaders()
    })
    .then(res => res.json());
};

