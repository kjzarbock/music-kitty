import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Register = () => {
    const [userData, setUserData] = useState({
        email: "",
        username: "",
        password: "",
        first_name: "",
        last_name: "",
        bio: "",
        image: "",
        has_cats: false,
        has_dogs: false,
        has_children: false
    });
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();

        fetch(`http://localhost:8000/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        })
        .then(res => res.json())
        .then(response => {
            if (response.token) {
                localStorage.setItem("kitty_user", response.token);
                navigate("/login");
            } else {
                window.alert(response.message);
            }
        });
    };

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setUserData({
            ...userData,
            [e.target.name]: value
        });
    };

    return (
        <main className="container--register">
            <section>
                <form className="form--register" onSubmit={handleRegister}>
                    <h1>Music Kitty</h1>
                    <h2>Register</h2>

                    <fieldset>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" required onChange={handleChange} />
                    </fieldset>

                    <fieldset>
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" required onChange={handleChange} />
                    </fieldset>

                    <fieldset>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" required onChange={handleChange} />
                    </fieldset>

                    <fieldset>
                        <label htmlFor="first_name">First Name</label>
                        <input type="text" name="first_name" required onChange={handleChange} />
                    </fieldset>

                    <fieldset>
                        <label htmlFor="last_name">Last Name</label>
                        <input type="text" name="last_name" required onChange={handleChange} />
                    </fieldset>

                    <fieldset>
                        <label htmlFor="bio">Bio</label>
                        <textarea name="bio" onChange={handleChange}></textarea>
                    </fieldset>

                    <fieldset>
                        <label htmlFor="image">Profile Image URL</label>
                        <input type="text" name="image" onChange={handleChange} />
                    </fieldset>

                    <fieldset>
                        <label>
                            <input type="checkbox" name="has_cats" onChange={handleChange} />
                            Click here if you have a cat
                        </label>
                    </fieldset>

                    <fieldset>
                        <label>
                            <input type="checkbox" name="has_dogs" onChange={handleChange} />
                            Click here if you have a dog
                        </label>
                    </fieldset>

                    <fieldset>
                        <label>
                            <input type="checkbox" name="has_children" onChange={handleChange} />
                            Click here if you have a child
                        </label>
                    </fieldset>

                    <fieldset>
                        <button type="submit">
                            Register
                        </button>
                    </fieldset>
                </form>
            </section>
            <section className="link--login">
                <Link to="/login">Already a member? Login</Link>
            </section>
        </main>
    )
};
