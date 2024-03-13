import "./App.css";
import AdminRooms from "./Components/Admin-Rooms";
import Adminroomadd from "./Components/AdminRoomadd";
import Booking from "./Components/Booking";
import Home from "./Components/Home";
import { AdminLayout } from "./Components/Layout/Admin-Layout";
import NavBar from "./Components/NavBar";
import Rooms from "./Components/Rooms";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/roomadd" element={<Adminroomadd />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="rooms" element={<AdminRooms />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
