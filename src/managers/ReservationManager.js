export const getAuthHeaders = () => {
    const user = JSON.parse(localStorage.getItem("kitty_user"));
    const token = user?.token;

    return {
        "Authorization": `Token ${token}`,
        "Content-Type": "application/json"
    };
};

export const createReservation = (newReservation) => {
    return fetch("http://localhost:8000/reservations", {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(newReservation),
    })
    .then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Failed to create reservation.");
        }
    });
};

export const getReservations = () => {
    return fetch("http://localhost:8000/reservations", {
    headers: getAuthHeaders()
    })
    .then((response) => {
        if (response.ok) {
        return response.json();
        } else {
        throw new Error("Failed to fetch reservation.");
        }
    });
};

export const getSingleReservation = (reservationId) => {
    return fetch(`http://localhost:8000/cats/${reservationId}`, {
    headers: getAuthHeaders()
    })
    .then(res => res.json());
};


