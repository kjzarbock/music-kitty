import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export const Register = (props) => {
    const [user, setUser] = useState({
        email: "",
        first_name: "",
        last_name: "",
        username: "",
        password: "",
        isStaff: false,
    });

    let navigate = useNavigate();

    const registerNewUser = () => {
        return fetch("http://localhost:8000/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        })
            .then((res) => res.json())
            .then((createdUser) => {
                if (createdUser.hasOwnProperty("token")) {
                    localStorage.setItem("kitty_user", createdUser.token);
                    navigate("/");
                }
            });
    };

    const handleRegister = (e) => {
        e.preventDefault();
        registerNewUser();
    };

    const updateUser = (evt) => {
        const copy = { ...user };
        copy[evt.target.id] = evt.target.value;
        setUser(copy);
    };

    return (
        <main style={{ textAlign: "center" }}>
            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">
                    Please Register for Music Kitty
                </h1>
                <fieldset>
                    <label htmlFor="first_name">First Name</label>
                    <input
                        onChange={updateUser}
                        type="text"
                        id="first_name"
                        className="form-control"
                        placeholder="Enter your first name"
                        required
                        autoFocus
                    />
                </fieldset>
                <fieldset>
                    <label htmlFor="last_name">Last Name</label>
                    <input
                        onChange={updateUser}
                        type="text"
                        id="last_name"
                        className="form-control"
                        placeholder="Enter your last name"
                        required
                    />
                </fieldset>
                <fieldset>
                    <label htmlFor="username">Username</label>
                    <input
                        onChange={updateUser}
                        type="text"
                        id="username"
                        className="form-control"
                        placeholder="Enter a username"
                        required
                    />
                </fieldset>
                <fieldset>
                    <label htmlFor="email">Email address</label>
                    <input
                        onChange={updateUser}
                        type="email"
                        id="email"
                        className="form-control"
                        placeholder="Email address"
                        required
                    />
                </fieldset>
                <fieldset>
                    <label htmlFor="password">Password</label>
                    <input
                        onChange={updateUser}
                        type="password"
                        id="password"
                        className="form-control"
                        placeholder="Enter a password"
                        required
                    />
                </fieldset>
                <fieldset>
                    <input
                        onChange={(evt) => {
                            const copy = { ...user };
                            copy.isStaff = evt.target.checked;
                            setUser(copy);
                        }}
                        type="checkbox"
                        id="isStaff"
                    />
                    <label htmlFor="isStaff"> I am an employee </label>
                </fieldset>
                <fieldset>
                    <button type="submit"> Register </button>
                </fieldset>
            </form>
        </main>
    );
}
