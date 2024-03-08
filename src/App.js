import "./App.css";
import Home from "./Components/Home";
import NavBar from "./Components/NavBar";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserUpdate from "./Components/updateuser";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<SignIn/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/update/:id/edit" element={<UserUpdate/>}/>
        </Routes>
      </BrowserRouter>
      
    </>
  );
}

export default App;
