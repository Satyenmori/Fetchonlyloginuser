import "./App.css";
import PageNotFound from "./Components/404";
import AdminProtected from "./Components/Admin-Protected";
import AdminRooms from "./Components/Admin-Rooms";
import RoomEditform from "./Components/AdminRoom-editform";
import Adminroomadd from "./Components/AdminRoomadd";
import Booking from "./Components/Booking";
import Foodadd from "./Components/FoodaddForm";
import Home from "./Components/Home";
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
          <Route path="/booking/:id" element={<Booking />} />
          <Route
            path="/roomadd"
            element={
              <AdminProtected>
                <Adminroomadd />
              </AdminProtected>
            }
          />
          <Route
            path="/admin/rooms"
            element={
              <AdminProtected>
                <AdminRooms />
              </AdminProtected>
            }
          />
          <Route
            path="/admin/room-form/edit/:id"
            element={
              <AdminProtected>
                <RoomEditform />
              </AdminProtected>
            }
          />
          <Route path="/addfood" element={<Foodadd />} />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
