import React, { useState, useEffect } from 'react';
import { getLocations } from '../../managers/LocationManager';
import { Background } from '../background/Background';

export const AdoptionList = () => {
    const [adoptions, setAdoptions] = useState([]);
    const [locations, setLocations] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editingAdoption, setEditingAdoption] = useState(null);
    const [title, setTitle] = useState("My Adoptions");

    const localUser = JSON.parse(localStorage.getItem("kitty_user"));
    const staff = localUser?.staff;

    useEffect(() => {
        if (staff) {
            setTitle("All Adoptions");
        }
    }, [staff]);

    useEffect(() => {
        fetchAdoptions();
    }, []);

    useEffect(() => {
        getLocations().then(setLocations);
    }, []);

    const fetchAdoptions = () => {
        const localUser = JSON.parse(localStorage.getItem("kitty_user"));
        const token = localUser?.token;
        let endpoint = 'http://localhost:8000/profile-adoptions'; // Default endpoint for regular users
    
        if (staff) {
            endpoint = 'http://localhost:8000/profile-adoptions'; // Endpoint for staff to see all adoptions
        }
    
        if (token) {
            fetch(endpoint, {
                method: "GET",
                headers: {
                    "Authorization": `Token ${token}`,
                    "Content-Type": "application/json"
                }
            })
            .then(res => res.json())
            .then(setAdoptions)
            .catch(error => {
                console.error("Error fetching adoptions:", error);
            });
        }
    };
    

    const handleDelete = (adoptionId) => {
        const shouldDelete = window.confirm("Are you sure you want to delete this adoption?");
        if (!shouldDelete) return;

        const localUser = JSON.parse(localStorage.getItem("kitty_user"));
        const token = localUser?.token;

        if (token) {
            fetch(`http://localhost:8000/adoptions/${adoptionId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Token ${token}`,
                    "Content-Type": "application/json"
                }
            })
            .then(() => {
                setAdoptions(prevAdoptions => prevAdoptions.filter(adoption => adoption.id !== adoptionId));
            })
            .catch(error => {
                console.error("Error deleting adoption:", error);
            });
        }
    };

    const handleEdit = (adoption) => {
        setIsEditing(true);
        setEditingAdoption(adoption);
    };

    const handleSave = () => {
        const localUser = JSON.parse(localStorage.getItem("kitty_user"));
        const token = localUser?.token;

        if (token) {
            fetch(`http://localhost:8000/adoptions/${editingAdoption.id}`, {
                method: "PUT",
                headers: {
                    "Authorization": `Token ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(editingAdoption)
            })
            .then(() => {
                setAdoptions(prevAdoptions => prevAdoptions.map(adoption => {
                    if (adoption.id === editingAdoption.id) {
                        return editingAdoption;
                    }
                    return adoption;
                }));
                setIsEditing(false);
                setEditingAdoption(null);
            })
            .catch(error => {
                console.error("Error updating adoption:", error);
            });
        }
    };

    return (
        <>
        <div>
            <h2>{title}</h2>
            {isEditing ? (
                <div>
                    <h3>Edit Adoption</h3>
                    {/* Add your editing form fields here */}
                    <button onClick={handleSave}>Save</button>
                </div>
            ) : (
                <ul>
                    {adoptions.map(adoption => (
                        <li key={adoption.id}>
                            <div><strong>Adopter Name:</strong> {adoption.profile.user.first_name} {adoption.profile.user.last_name}</div>
                            <div><strong>Cat:</strong> {adoption.cat.name}</div>
                            <div><strong>Adoption Date:</strong> {adoption.adoption_date}</div>
                            <div><strong>Status:</strong> {adoption.status}</div>
                            <button onClick={() => handleDelete(adoption.id)}>Delete</button>
                            <button onClick={() => handleEdit(adoption)}>Edit</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
        <Background />
        </>
    );
};