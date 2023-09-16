import React, { useState, useEffect } from 'react';
import { getLocations } from '../../managers/LocationManager';

export const ReservationList = () => {
    const [reservations, setReservations] = useState([]);
    const [locations, setLocations] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editingReservation, setEditingReservation] = useState(null);
    const [title, setTitle] = useState("My Reservations");

    const localUser = JSON.parse(localStorage.getItem("kitty_user"));
    const staff = localUser?.staff;
    
    const timeSlots = [];
    let currentTime = new Date();
    currentTime.setHours(11, 0, 0, 0); // Start at 11:00 AM
    const endTime = new Date();
    endTime.setHours(20, 0, 0, 0); // End at 8:00 PM
    
    while (currentTime <= endTime) {
        const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        timeSlots.push(formattedTime);
        currentTime.setMinutes(currentTime.getMinutes() + 30); // Add 30 minutes
    }

    useEffect(() => {
        if (staff) {
            setTitle("All Reservations");
        }
    }, [staff]);

    useEffect(() => {
        fetchReservations();
    }, []);

    useEffect(() => {
        getLocations().then(setLocations);
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
        const twelveHour = parsedHours % 12 || 12; 
        return `${twelveHour}:${minutes} ${ampm}`;
    };

    const convertTo24HourFormat = (time12Hour) => {
        const [time, modifier] = time12Hour.split(' ');
        let [hours, minutes] = time.split(':');
        
        if (hours === '12') {
            hours = '00';
        }
        
        if (modifier === 'PM') {
            hours = parseInt(hours, 10) + 12;
        }
        
        return `${hours}:${minutes}`;
    };

    const handleDelete = (reservationId) => {
        const shouldDelete = window.confirm("Are you sure you want to delete this reservation?");
        if (!shouldDelete) return; 

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
                setReservations(prevReservations => prevReservations.filter(reservation => reservation.id !== reservationId));
            })
            .catch(error => {
                console.error("Error deleting reservation:", error);
            });
        }
    };

    const handleEdit = (reservation) => {
        setIsEditing(true);
        setEditingReservation({
            id: reservation.id,
            profile: reservation.profile,
            date: reservation.date,
            time: reservation.time, // This is already in 12-hour format for display
            number_of_guests: reservation.number_of_guests,
            location: reservation.location.id
        });
    };

const handleSave = () => {
    const updatedReservation = {
        id: editingReservation.id,
        location: parseInt(editingReservation.location, 10),
        date: editingReservation.date,
        time: convertTo24HourFormat(editingReservation.time), // Convert to 24-hour format
        number_of_guests: parseInt(editingReservation.number_of_guests, 10)
    };

    const localUser = JSON.parse(localStorage.getItem("kitty_user"));
    const token = localUser?.token;

    if (token) {
        fetch(`http://localhost:8000/reservations/${editingReservation.id}`, {
            method: "PUT",
            headers: {
                "Authorization": `Token ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedReservation)
        })
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            if (res.status === 204) {
                return null;  // No content to parse
            }
            return res.json();
        })
        .then(data => {
            // Update the local state with the updated reservation
            setReservations(prevReservations => prevReservations.map(reservation => {
                if (reservation.id === editingReservation.id) {
                    return {
                        ...reservation,
                        location: locations.find(loc => loc.id === updatedReservation.location),
                        date: updatedReservation.date,
                        time: formatTime(updatedReservation.time),
                        number_of_guests: updatedReservation.number_of_guests
                    };
                }
                return reservation;
            }));
            setIsEditing(false);
            setEditingReservation(null);
        })
        .catch(error => {
            console.error("Error updating reservation:", error);
        });
    }
};


    return (
        <div>
            <h2>{title}</h2>
            {isEditing ? (
                <div>
                    <h3>Edit Reservation</h3>
                    <label>Date: <input type="date" value={editingReservation.date} onChange={e => setEditingReservation({...editingReservation, date: e.target.value})} /></label>
                    <label>Time:
                        <select value={editingReservation.time} onChange={e => setEditingReservation({...editingReservation, time: e.target.value})}>
                            {timeSlots.map(time => (
                                <option key={time} value={time}>{time}</option>
                            ))}
                        </select>
                    </label>
                    <label>Number of Guests: <input type="number" value={editingReservation.number_of_guests} onChange={e => setEditingReservation({...editingReservation, number_of_guests: e.target.value})} /></label>
                    <button onClick={handleSave}>Save</button>
                </div>
            ) : (
                <ul>
                    {reservations.map(reservation => (
                        <li key={reservation.id}>
                            <div><strong>Guest Name:</strong> {reservation.profile.user.first_name} {reservation.profile.user.last_name}</div>
                            <div><strong>Location:</strong> {reservation.location.name}</div>
                            <div><strong>Date:</strong> {reservation.date}</div>
                            <div><strong>Time:</strong> {reservation.time}</div>
                            <div><strong>Number of Guests:</strong> {reservation.number_of_guests}</div>
                            <button onClick={() => handleDelete(reservation.id)}>Delete</button>
                            <button onClick={() => handleEdit(reservation)}>Edit</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};


