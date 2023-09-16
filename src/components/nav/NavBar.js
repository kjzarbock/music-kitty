import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";

export const NavBar = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("kitty_user");
        navigate("/", { replace: true });
    };

    useEffect(() => {
        const closeDropdown = () => setIsOpen(false);
        document.addEventListener("click", closeDropdown);

        return () => document.removeEventListener("click", closeDropdown);
    }, []);

    // Check if the user is logged in
    if (localStorage.getItem("kitty_user")) {
        return (
            <div className="navbar-container" onClick={e => e.stopPropagation()}>
                <button className="hamburger-btn" onClick={() => setIsOpen(!isOpen)}>☰</button>

                {isOpen && (
                    <ul className="navbar-dropdown">
                        <li className="navbar__item">
                            <Link className="navbar__link" to="/" onClick={() => setIsOpen(false)}>Home</Link>
                        </li>
                        <li className="navbar__item">
                            <Link className="navbar__link" to="/locations" onClick={() => setIsOpen(false)}>Locations</Link>
                        </li>
                        <li className="navbar__item">
                            <Link className="navbar__link" to="/cats" onClick={() => setIsOpen(false)}>Cats</Link>
                        </li>
                        <li className="navbar__item">
                            <Link className="navbar__link" to="/products" onClick={() => setIsOpen(false)}>Products</Link>
                        </li>
                        <li className="navbar__item">
                            <Link className="navbar__link" to="/reservations" onClick={() => setIsOpen(false)}>Reservations</Link>
                        </li>
                        <li className="navbar__item">
                            <Link className="navbar__link" to="/profiles" onClick={() => setIsOpen(false)}>Profiles</Link>
                        </li>
                        <li className="navbar__item navbar__logout">
                            <Link className="navbar__link" to="" onClick={handleLogout}>Logout</Link>
                        </li>
                    </ul>
                )}
            </div>
        );
    } else {
        return null; 
    }
};
