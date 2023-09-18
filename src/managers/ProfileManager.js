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
      headers: {
        ...getAuthHeaders(),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedProfile),
    })
    .then(async (response) => {
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        console.error("Server Error:", data);
        throw new Error("Failed to update profile.");
      }
    })
    .catch((error) => {
      console.error("Fetch Error:", error);
    });
  }

  export const toggleStaffStatus = (profileId) => {
    return fetch(`http://localhost:8000/profiles/${profileId}/set_staff_status/`, {
      method: 'PUT',
      headers: getAuthHeaders(),
    })
    .then(response => response.json())
    .catch(error => console.error("Error:", error));
  };