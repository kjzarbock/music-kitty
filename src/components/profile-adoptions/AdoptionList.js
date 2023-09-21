import React, { useState, useEffect } from 'react';
import { getLocations } from '../../managers/LocationManager';
import { Background } from '../background/Background';
import { Link } from 'react-router-dom';
import { getAdoptions, deleteAdoption } from '../../managers/ProfileAdoptionManager';
import './AdoptionList.css';

export const AdoptionList = () => {
    const [adoptions, setAdoptions] = useState([]);
    const [locations, setLocations] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editingAdoption, setEditingAdoption] = useState(null);
    const [title, setTitle] = useState("My Adoptions");
    const [searchQuery, setSearchQuery] = useState("");
    const [editedApprovalStatus, setEditedApprovalStatus] = useState("");
    const localUser = JSON.parse(localStorage.getItem("kitty_user"));
    const staff = localUser?.staff;

    useEffect(() => {
        if (staff) {
            setTitle("All Adoptions");
        }
    }, [staff]);

    useEffect(() => {
        fetchAdoptions();
        getLocations().then(setLocations);
    }, []);

    const fetchAdoptions = () => {
        getAdoptions()
            .then(setAdoptions)
            .catch(error => {
                console.error("Error fetching adoptions:", error);
            });
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
    
        deleteAdoption(adoptionId)
            .then((response) => {
                console.log("Delete response:", response);
                setAdoptions(prevAdoptions => prevAdoptions.filter(adoption => adoption.id !== adoptionId));
            })
            .catch(error => {
                console.error("Error deleting adoption:", error);
            });
    };
    
    const handleEdit = (adoption) => {
        setIsEditing(true);
        setEditingAdoption({ ...adoption });
        setEditedApprovalStatus(adoption.status);
    };

    const handleSave = () => {
        const localUser = JSON.parse(localStorage.getItem("kitty_user"));
        const token = localUser?.token;

        if (token) {
            const clonedAdoption = { ...editingAdoption };
            clonedAdoption.status = editedApprovalStatus; // Adjust this to match your server expectations

            fetch(`http://localhost:8000/profile-adoptions/${clonedAdoption.id}`, {
                method: "PUT",
                headers: {
                    "Authorization": `Token ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(clonedAdoption)
            })
            .then(() => {
                setAdoptions(prevAdoptions => prevAdoptions.map(adoption => {
                    if (adoption.id === clonedAdoption.id) {
                        return clonedAdoption;
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
        <div className="adoption-container">
            <h2>{title}</h2>
            <input
                type="text"
                placeholder="Adopter, cat name, location"
                value={searchQuery}
                onChange={handleSearch}
                className="adoption-form input"
            />
            {isEditing ? (
                <div className="adoption-form">
                    <h3>Edit Adoption</h3>
                    <div>
                        <label htmlFor="approvalStatus">Approval Status:</label>
                        <select
                            id="approvalStatus"
                            value={editedApprovalStatus}
                            onChange={(e) => setEditedApprovalStatus(e.target.value)}
                            className="adoption-form input"
                        >
                            <option value="Denied">Denied</option>
                            <option value="Pending">Pending</option>
                            <option value="Approved">Approved</option>
                        </select>
                    </div>
                    {staff && <button onClick={handleSave} className="adoption-form button">Save</button>}
                </div>
            ) : (
                <ul>
                    {!staff && (
                        <div>
                            <Link to="/profile-adoptions" className="cat-profile-button">Create another adoption Request!</Link>
                        </div>
                    )}
                    {filteredAdoptions.map(adoption => (
                        <li key={adoption.id} className="adoption-list-item">
                            {/* Add a class name to each div here if needed, like className="adoption-list-item" */}
                            <div><strong>Adopter Name:</strong> <a href={`/profiles/${adoption.profile.user.id}`}>{adoption.profile.user.first_name} {adoption.profile.user.last_name}</a></div>
                            <div><strong>Approved to Adopt:</strong> {adoption.profile.approved_to_adopt ? "Yes" : "No"}</div>
                            <div><strong>Cat:</strong> <a href={`/cats/${adoption.cat.id}`}>{adoption.cat.name}</a></div>
                            <div><strong>Location:</strong> {adoption.cat.location.name}</div>
                            <div><strong>Adoption Date:</strong> {adoption.adoption_date}</div>
                            <div><strong>Status:</strong> {adoption.status}</div>
                            {staff && <button onClick={() => handleDelete(adoption.id)} className="adoption-form button">Delete</button>}
                            {!staff && <button onClick={() => handleDelete(adoption.id)} className="adoption-form button">Delete</button>}
                            {staff && <button onClick={() => handleEdit(adoption)} className="adoption-form button">Edit</button>}
                        </li>
                    ))}
                </ul>
            )}
        </div>
        <Background />
        </>
    );
};