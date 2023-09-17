import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        return fetch(`http://localhost:8000/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        .then(res => res.json())
        .then(response => {
            if (response.valid) {
                localStorage.setItem("kitty_user", JSON.stringify({
                    token: response.token,
                    staff: response.staff
                }));
                console.log(`User is ${response.staff ? 'a staff member' : 'not a staff member'}.`);
                navigate("/");
            } else {
                window.alert("Invalid login");
            }
        });
    };

    return (
        <>
            <div className="area">
                <ul className="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>
            <div className="context">
            <div className="emoji-container">
                <div className="cat-animation">🐱</div>
                <div className="coffee-animation">☕</div>
            </div>
            </div>
            <main className="container--login">
                <section>
                    <form className="form--login" onSubmit={handleLogin}>
                        <h1>Welcome to Music Kitty Cafe</h1>
                        <h2>Please sign in</h2>
                        <fieldset>
                            <label htmlFor="inputUsername"> Username </label> 
                            <input 
                                type="text" 
                                value={username}
                                onChange={evt => setUsername(evt.target.value)}
                                className="form-control"
                                placeholder="Username"
                                required autoFocus 
                            />
                        </fieldset>
                        <fieldset>
                            <label htmlFor="inputPassword"> Password </label>
                            <input 
                                type="password"
                                value={password}
                                onChange={evt => setPassword(evt.target.value)}
                                className="form-control"
                                placeholder="Password"
                                required 
                            />
                        </fieldset>
                        <fieldset>
                            <button type="submit">
                                Sign in
                            </button>
                        </fieldset>
                <section className="link--register">
                <Link to="/register" style={{ color: 'white', fontWeight: 'bold' }}>Not a member yet?</Link>
                </section>
                    </form>
                </section>
            </main>
        </>
    );
};
