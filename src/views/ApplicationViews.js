import { Route, Routes } from "react-router-dom";
import { Login } from "../components/auth/Login";
import { Register } from "../components/auth/Register";
import { Authorized } from "./Authorized";
import { Home } from "../components/home/Home";
import { LocationList } from "../components/locations/LocationList";
import { LocationDetails } from "../components/locations/LocationDetails"; 
import { CatList } from "../components/cats/CatList";
import { CatDetails } from "../components/cats/CatDetails";
import { ProductList } from "../components/products/ProductList";
import { ProductDetails } from "../components/products/ProductDetails";
import { ReservationForm } from "../components/reservations/ReservationForm";
import { ReservationList } from "../components/reservations/ReservationList";

export const ApplicationViews = ({ token, setToken }) => {
    return (
      <Routes>
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register setToken={setToken} />} />
        <Route 
          path="/*" 
          element={
            <Authorized token={token}>
              <Routes>
                <Route index element={<Home setToken={setToken} />} />
				<Route path="/cats" element={<CatList setToken={setToken} />} />
                <Route path="/locations" element={<LocationList setToken={setToken} />} />
                <Route path="/locations/:locationId" element={<LocationDetails />} />
				<Route path="/cats/:catId" element={<CatDetails setToken={setToken} />} />
				<Route path="/products" element={<ProductList setToken={setToken} />} />
				<Route path="/products/:productId" element={<ProductDetails setToken={setToken} />} />
				<Route path="/reservations" element={<ReservationForm setToken={setToken} />} />
        <Route path="/my-reservations" element={<ReservationList setToken={setToken} />} />
              </Routes>
            </Authorized>
          } 
        />
      </Routes>
    );
};
