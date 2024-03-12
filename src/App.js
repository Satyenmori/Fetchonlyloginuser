import "./App.css";
import Adminroomadd from "./Components/AdminRoomadd";
import Booking from "./Components/Booking";
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
          <Route path="/booking" element={<Booking />} />
          <Route path="/roomadd" element={<Adminroomadd />} />
          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
