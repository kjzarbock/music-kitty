import React, { useState, useEffect } from 'react';
import { getLocations } from '../../managers/LocationManager';
import { Background } from '../background/Background';
import { Link } from 'react-router-dom';

export const AdoptionList = () => {
    const [adoptions, setAdoptions] = useState([]);
    const [locations, setLocations] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editingAdoption, setEditingAdoption] = useState(null);
    const [title, setTitle] = useState("My Adoptions");
    const [searchQuery, setSearchQuery] = useState("");
    const [editedApprovalStatus, setEditedApprovalStatus] = useState(""); // New state variable

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
        let endpoint = 'http://localhost:8000/profile-adoptions';

        if (staff) {
            endpoint = 'http://localhost:8000/profile-adoptions';
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

    const handleSearch = (e) => {
        setSearchQuery(e.target.value.toLowerCase());
    };

    const filteredAdoptions = adoptions.filter(adoption => {
        const adopterName = `${adoption.profile.user.first_name} ${adoption.profile.user.last_name}`.toLowerCase();
        const catName = adoption.cat.name.toLowerCase();
        const locationName = adoption.cat.location.name.toLowerCase();
        return adopterName.includes(searchQuery) || catName.includes(searchQuery) || locationName.includes(searchQuery);
    });

    const handleDelete = (adoptionId) => {
        const shouldDelete = window.confirm("Are you sure you want to delete this adoption?");
        if (!shouldDelete) return;

        const localUser = JSON.parse(localStorage.getItem("kitty_user"));
        const token = localUser?.token;

        if (token) {
            fetch(`http://localhost:8000/profile-adoptions/${adoptionId}`, {
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
        setEditedApprovalStatus(adoption.profile.approved_to_adopt ? "Yes" : "No"); // Initialize editedApprovalStatus
    };

    const handleSave = () => {
        const localUser = JSON.parse(localStorage.getItem("kitty_user"));
        const token = localUser?.token;

        if (token) {
            // Update the approval status in the editingAdoption object
            editingAdoption.profile.approved_to_adopt = editedApprovalStatus === "Yes";

            fetch(`http://localhost:8000/profile-adoptions/${editingAdoption.id}`, {
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
            <input
                type="text"
                placeholder="Adopter, cat name, location"
                value={searchQuery}
                onChange={handleSearch}
            />
            {isEditing ? (
                <div>
                    <h3>Edit Adoption</h3>
                    <div>
                        <label htmlFor="approvalStatus">Approval Status:</label>
                        <select
                            id="approvalStatus"
                            value={editedApprovalStatus}
                            onChange={(e) => setEditedApprovalStatus(e.target.value)}
                        >
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </div>
                    {staff && <button onClick={handleSave}>Save</button>}
                </div>
            ) : (
                <ul>
                    {filteredAdoptions.map(adoption => (
                        <li key={adoption.id}>
                            <div><strong>Adopter Name:</strong> <a href={`/profiles/${adoption.profile.user.id}`}>{adoption.profile.user.first_name} {adoption.profile.user.last_name}</a></div>
                            <div><strong>Approved to Adopt:</strong> {adoption.profile.approved_to_adopt ? "Yes" : "No"}</div>
                            <div><strong>Cat:</strong> <a href={`/cats/${adoption.cat.id}`}>{adoption.cat.name}</a></div>
                            <div><strong>Location:</strong> {adoption.cat.location.name}</div>
                            <div><strong>Adoption Date:</strong> {adoption.adoption_date}</div>
                            <div><strong>Status:</strong> {adoption.status}</div>
                            {staff && <button onClick={() => handleDelete(adoption.id)}>Delete</button>}
                            {!staff && <button onClick={() => handleDelete(adoption.id)}>Delete</button>}
                            {staff && <button onClick={() => handleEdit(adoption)}>Edit</button>}
                        </li>
                    ))}
                </ul>
            )}
            {!staff && (
                <div>
                    <Link to="/profile-adoptions">Create another adoption Request!</Link>
                </div>
            )}
        </div>
        <Background />
        </>
    );
};
