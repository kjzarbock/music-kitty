import React, { useState, useEffect } from 'react';

export const ReservationList = () => {
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        fetchReservations();
    }, []);

    const fetchReservations = () => {
        const localUser = JSON.parse(localStorage.getItem("kitty_user"));
        const token = localUser?.token;

        if (token) {
            fetch(`http://localhost:8000/reservations`, {
                method: "GET",
                headers: {
                    "Authorization": `Token ${token}`,
                    "Content-Type": "application/json"
                }
            })
            .then(res => res.json())
            .then(data => {
                // Format the time to 12-hour format with AM/PM
                const formattedData = data.map(reservation => ({
                    ...reservation,
                    time: formatTime(reservation.time),
                }));
                setReservations(formattedData);
            })
            .catch(error => {
                console.error("Error fetching reservations:", error);
            });
        }
    };

    const formatTime = (time24Hour) => {
        const [hours, minutes] = time24Hour.split(':');
        const parsedHours = parseInt(hours, 10);
        const ampm = parsedHours >= 12 ? 'PM' : 'AM';
        const twelveHour = parsedHours % 12 || 12; // Convert 0 to 12
        return `${twelveHour}:${minutes} ${ampm}`;
    };

    const handleDelete = (reservationId) => {
        const shouldDelete = window.confirm("Are you sure you want to delete this reservation?");
        if (!shouldDelete) return; // Exit the function if the user clicked "Cancel"

        const localUser = JSON.parse(localStorage.getItem("kitty_user"));
        const token = localUser?.token;

        if (token) {
            fetch(`http://localhost:8000/reservations/${reservationId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Token ${token}`,
                    "Content-Type": "application/json"
                }
            })
            .then(() => {
                // Update reservations by filtering out the deleted one
                setReservations(prevReservations => prevReservations.filter(reservation => reservation.id !== reservationId));
            })
            .catch(error => {
                console.error("Error deleting reservation:", error);
            });
        }
    };

    return (
        <div>
            <h2>My Reservations</h2>
            <ul>
                {reservations.map(reservation => (
                    <li key={reservation.id}>
                        <div><strong>Location:</strong> {reservation.location.name}</div>
                        <div><strong>Date:</strong> {reservation.date}</div>
                        <div><strong>Time:</strong> {reservation.time}</div>
                        <div><strong>Number of Guests:</strong> {reservation.number_of_guests}</div>
                        <button onClick={() => handleDelete(reservation.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};
