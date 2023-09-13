const getAuthHeaders = () => ({
    "Authorization": `Token ${localStorage.getItem("auth_token")}`,
    "Content-Type": "application/json"
});

export const getAllReservations = () => {
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
    return fetch(`http://localhost:8000/locations/${reservationId}`, {
    headers: getAuthHeaders()
    })
    .then(res => res.json());
};