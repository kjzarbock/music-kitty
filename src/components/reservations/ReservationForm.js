import React, { useState, useEffect } from 'react';
import { createReservation } from '../../managers/ReservationManager';
import { getLocations } from '../../managers/LocationManager';

export const ReservationForm = () => {
    const [locations, setLocations] = useState([]);
    const [location, setLocation] = useState('');
    const [reservationDate, setReservationDate] = useState('');
    const [reservationTime, setReservationTime] = useState('');
    const [numberOfGuests, setNumberOfGuests] = useState('');
    const [userInfo, setUserInfo] = useState(null);
    const [loadingUserInfo, setLoadingUserInfo] = useState(true);

    useEffect(() => {
        getLocations().then(setLocations);

        const localUser = JSON.parse(localStorage.getItem("kitty_user"));
        const token = localUser?.token;

        if (token) {
            fetch(`http://localhost:8000/profiles/me/`, {  // Updated URL
                method: "GET",
                headers: {
                    "Authorization": `Token ${token}`,
                    "Content-Type": "application/json"
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log("Fetched data:", data);
                setUserInfo(data);
                setLoadingUserInfo(false);
            })
            .catch(error => {
                console.error("Error fetching user information:", error);
                setLoadingUserInfo(false);
            });
        } else {
            setLoadingUserInfo(false);
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log('Current UserInfo:', userInfo);
        const userId = userInfo?.user?.id;

        if (!userId) {
            console.error("User ID is undefined. Cannot proceed with the reservation.");
            return;
        }

        console.log('User ID:', userId);

        const newReservation = {
            profile: userId,
            location: parseInt(location, 10),
            date: reservationDate,
            time: reservationTime,
            number_of_guests: parseInt(numberOfGuests, 10)
        };

        console.log('New Reservation Payload:', newReservation);

        createReservation(newReservation)
            .then(() => {
                // Handle success, e.g., navigate to a confirmation page or show a success message
            })
            .catch((error) => {
                console.error("Error creating reservation:", error);
            });
    };

    if (loadingUserInfo) {
        return <div>Loading...</div>; // or some other loading indicator
    }

    return (
        <div>
            <h2>Create Reservation</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Location:</label>
                    <select 
                        value={location} 
                        onChange={(e) => setLocation(e.target.value)}
                        required
                    >
                        <option value="">Select a Location</option>
                        {locations.map(loc => (
                            <option key={loc.id} value={loc.id}>{loc.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Date:</label>
                    <input 
                        type="date" 
                        value={reservationDate} 
                        onChange={(e) => setReservationDate(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Time:</label>
                    <input 
                        type="time" 
                        value={reservationTime} 
                        onChange={(e) => setReservationTime(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Number of Guests:</label>
                    <input 
                        type="number" 
                        value={numberOfGuests} 
                        onChange={(e) => setNumberOfGuests(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <button type="submit">Create Reservation</button>
                </div>
            </form>
        </div>
    );
};
