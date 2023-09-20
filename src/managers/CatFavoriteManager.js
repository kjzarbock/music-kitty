const getAuthHeaders = () => {
    const user = JSON.parse(localStorage.getItem("kitty_user"));
    const token = user?.token;
  
    return {
      "Authorization": `Token ${token}`,
      "Content-Type": "application/json"
    };
  };

  export const createFavorite = (newFavorite) => {
    return fetch("http://localhost:8000/cat-favorites", {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(newFavorite),
    })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Failed to create favorite.");
      }
    });
  }

  export const getMyFavoriteCats = (profileId) => {
    return fetch(`http://localhost:8000/cat-favorites/?profile_id=${profileId}`, {
      method: "GET",
      headers: getAuthHeaders(),
    })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Failed to fetch favorite cats.");
      }
    });
  };