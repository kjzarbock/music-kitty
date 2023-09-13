import { Route, Routes } from "react-router-dom"
import { Authorized } from "./views/Authorized"
import { ApplicationViews } from "./views/ApplicationViews"
import { NavBar } from "./nav/NavBar"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import { AdminViews } from "./views/AdminViews"
import "./MusicKitty.css"
import { useContext } from "react"
import { UserContext } from "./contexts/UserContext"

export const MusicKitty = () => {
    const user = useContext(UserContext);

    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Check if the user is a staff member */}
            {user && user.role === 'staff' ? (
                <Route path="/admin" element={
                    <Authorized>
                        <AdminViews />
                    </Authorized>
                } />
            ) : null}

            <Route path="*" element={
                <Authorized>
                    <NavBar />
                    <ApplicationViews />
                </Authorized>
            } />
        </Routes>
    );
}


