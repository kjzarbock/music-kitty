const getAuthHeaders = () => {
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
  
  export const addCat = (newCat) => {
    return fetch("http://localhost:8000/cats", {
      method: "POST",
      headers: {
        ...getAuthHeaders(),
        'Content-Type': 'application/json', // Ensure JSON content type
      },
      body: JSON.stringify(newCat)
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .catch((error) => {
      console.error('Error adding cat:', error);
      throw error; // Propagate the error for further handling
    });
  };
  