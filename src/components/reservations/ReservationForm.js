import React, { useState, useEffect } from 'react';
import { createReservation } from '../../managers/ReservationManager';
import { getLocations } from '../../managers/LocationManager';
import { Link } from 'react-router-dom';
import { ReservationList } from './ReservationList';
import { Background } from '../background/Background';

export const ReservationForm = () => {
    const [locations, setLocations] = useState([]);
    const [location, setLocation] = useState('');
    const [reservationDate, setReservationDate] = useState('');
    const [reservationTime, setReservationTime] = useState('11:00'); 
    const [numberOfGuests, setNumberOfGuests] = useState('');
    const [userInfo, setUserInfo] = useState(null);
    const [loadingUserInfo, setLoadingUserInfo] = useState(true);

    useEffect(() => {
        getLocations().then(setLocations);
        
        const localUser = JSON.parse(localStorage.getItem("kitty_user"));
        const token = localUser?.token;
        
        if (token) {
            fetch(`http://localhost:8000/profiles/me/`, {
                method: "GET",
                headers: {
                    "Authorization": `Token ${token}`,
                    "Content-Type": "application/json"
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log("Fetched user data:", data);  
                setUserInfo(data);
                setLoadingUserInfo(false);
            })
            .catch(error => {
                console.error("Error fetching user information:", error);
                setUserInfo(localUser);  
                setLoadingUserInfo(false);
            });
        } else {
            setUserInfo(localUser);  
            setLoadingUserInfo(false);
        }
    }, []);

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

    const timeSlots = [];
    let currentTime = new Date();
    currentTime.setHours(11, 0, 0, 0); 
    const endTime = new Date();
    endTime.setHours(20, 0, 0, 0); 

    while (currentTime <= endTime) {
        const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        timeSlots.push(formattedTime);
        currentTime.setMinutes(currentTime.getMinutes() + 30); 
    }

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
            time: convertTo24HourFormat(reservationTime),
            number_of_guests: parseInt(numberOfGuests, 10)
        };

        console.log('New Reservation Payload:', newReservation);

        createReservation(newReservation)
            .then(() => {
                window.alert(`Reservation made successfully!
Location: ${locations.find(loc => loc.id === parseInt(location, 10))?.name}
Date: ${reservationDate}
Time: ${reservationTime}
Number of Guests: ${numberOfGuests}
                `);
                setLocation('');
                setReservationDate('');
                setReservationTime('11:00'); 
                setNumberOfGuests('');
            })
            .catch((error) => {
                console.error("Error creating reservation:", error);
            });
    };
    console.log('userInfo:', userInfo);
    console.log('userInfo?.user?.staff:', userInfo?.user?.staff);
    if (loadingUserInfo) {
        return <div>Loading...</div>;
    }

    if (userInfo?.user?.is_staff) {
        console.log('Rendering ReservationList');
        return <ReservationList />;
    } else {
        return (
            <>
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
                        <select
                            value={reservationTime}
                            onChange={(e) => setReservationTime(e.target.value)}
                            required
                        >
                            {timeSlots.map(slot => (
                                <option key={slot} value={slot}>{slot}</option>
                            ))}
                        </select>
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
                <div>
                    <Link to="/my-reservations">View My Reservations</Link>
                </div>
            </div>
            <Background />
            </>
        );
    }
};
