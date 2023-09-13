const getAuthHeaders = () => ({
    "Authorization": `Token ${localStorage.getItem("auth_token")}`,
    "Content-Type": "application/json"
});

export const getAllCats = () => {
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
    return fetch(`http://localhost:8000/locations/${catId}`, {
    headers: getAuthHeaders()
    })
    .then(res => res.json());
};

export const deleteCat = (catId) => {
    return fetch(`http://localhost:8000/cats/${catId}`, {
        method: "DELETE",
        headers: getAuthHeaders()
    })
    .then(res => res.json());
}

export const createCat = (cat) => {
    return fetch("http://localhost:8000/cats", {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(cat)
    })
    .then(res => res.json());
}

export const updateCat = (catId, updatedCat) => {
    return fetch(`http://localhost:8000/cats/${catId}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCat),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to update cat.");
            }
        });
};