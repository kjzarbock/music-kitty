const getAuthHeaders = () => {
    const user = JSON.parse(localStorage.getItem("kitty_user"));
    const token = user?.token;

    return {
        "Authorization": `Token ${token}`,
        "Content-Type": "application/json"
    };
};

export const getProfiles = () => {
    return fetch("http://localhost:8000/profiles", {
    headers: getAuthHeaders()
    })
    .then((response) => {
        if (response.ok) {
        return response.json();
        } else {
        throw new Error("Failed to fetch profile.");
        }
    });
};

export const getSingleProfile = (profileId) => {
    return fetch(`http://localhost:8000/profiles/${profileId}`, {
    headers: getAuthHeaders()
    })
    .then(res => res.json());
};
