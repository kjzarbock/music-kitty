const getAuthHeaders = () => {
    const user = JSON.parse(localStorage.getItem("kitty_user"));
    const token = user?.token;

    return {
        "Authorization": `Token ${token}`,
        "Content-Type": "application/json"
    };
};

export const getAdoptions = () => {
    return fetch("http://localhost:8000/profile-adoptions", {
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

export const getSingleAdoption = (adoptionId) => {
    return fetch(`http://localhost:8000/profile-adoptions/${adoptionId}`, {
    headers: getAuthHeaders()
    })
    .then(res => res.json());
};

export const createAdoption = (newAdoption) => {
    return fetch("http://localhost:8000/profile-adoptions", {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(newAdoption),
    })
    .then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Failed to create adoption.");
        }
    });
}
