import { Navigate, useLocation, Outlet } from "react-router-dom";
import { createContext, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { Home } from "../home/Home";

export const Authorized = ({ children }) => {
    const location = useLocation();
    const user = JSON.parse(localStorage.getItem("kitty_user"));

    if (user) {
        return (
            <UserContext.Provider value={user}>
                {children}
                <Outlet />  
                <Home />
            </UserContext.Provider>
        );
    } else {
        return <Navigate to={`/login/${location.search}`} replace state={{ location }} />;
    }
}
