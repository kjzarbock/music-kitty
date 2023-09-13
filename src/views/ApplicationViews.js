import { Route, Routes } from "react-router-dom";
import { Login } from "../components/auth/Login";
import { Register } from "../components/auth/Register";
import { Authorized } from "./Authorized";
import { Home } from "../components/home/Home";

export const ApplicationViews = ({ token, setToken }) => {
  return (
    <Routes>
      <Route path="/login" element={<Login setToken={setToken} />} />
      <Route path="/register" element={<Register setToken={setToken} />} />
      <Route 
        path="/" 
        element={
          <Authorized token={token}>
            <Routes>
              <Route path="/" element={<Home setToken={setToken} />} />
              {/* Add other nested routes under Authorized here, if any */}
            </Routes>
          </Authorized>
        } 
      />
    </Routes>
  );
};
