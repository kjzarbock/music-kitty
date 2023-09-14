import { Route, Routes } from "react-router-dom";
import { Login } from "../components/auth/Login";
import { Register } from "../components/auth/Register";
import { Authorized } from "./Authorized";
import { Home } from "../components/home/Home";
import { LocationList } from "../components/locations/LocationList";

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
				<Route index="/" element={<Home setToken={setToken} />} /> {/* Make Home the default route */}
				<Route path="/locations" element={<LocationList setToken={setToken} />} />
			  </Routes>
			</Authorized>
		  } 
		/>
	  </Routes>
	);
  };
  
