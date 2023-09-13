import { Route, Routes } from "react-router-dom";
import { Home } from "../home/Home";

export const AdminViews = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} /> 
        </Routes>
    );
};
