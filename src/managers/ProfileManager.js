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

export const getMyProfile = () => {
    return fetch(`http://localhost:8000/profiles/me`, {
    headers: getAuthHeaders()
    })
    .then(res => res.json());
}

export const updateUserProfile = (profileId, updatedProfile) => {
    return fetch(`http://localhost:8000/profiles/${profileId}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(updatedProfile),
    })
    .then((response) => {
        if (response.ok) {
            if (response.status === 204) { // No Content
                return null;
            }
            return response.json();
        } else {
            throw new Error("Failed to update profile.");
        }
    });
}

export const updateMyProfile = (profileId, updatedProfile) => {
    return fetch(`http://localhost:8000/profiles/me`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(updatedProfile),
    })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Failed to update profile.");
      }
    });
  }