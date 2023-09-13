import { Route, Routes } from "react-router-dom";
import { Login } from "../auth/Login";
import { Register } from "../auth/Register";
import { Authorized } from "./Authorized";
import { Home } from "../home/Home";


export const AdminViews = ({ token, setToken, isAdmin, setAdmin }) => {
    return (
      <>
        <Routes>
          <Route path="/login" element={<Login setToken={setToken} setAdmin={setAdmin} />} />
          <Route path="/register" element={<Register setToken={setToken} setAdmin={setAdmin} />} />
          <Route path="/admin" element={<Authorized token={token} />}>
              <Route index element={<Home />} />
          </Route>
        </Routes>
      </>
    );
  };
  