const getAuthHeaders = () => ({
    "Authorization": `Token ${localStorage.getItem("auth_token")}`,
    "Content-Type": "application/json"
});

export const getAllProfiles = () => {
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
    return fetch(`http://localhost:8000/profile/${profileId}`, {
    headers: getAuthHeaders()
    })
    .then(res => res.json());
};