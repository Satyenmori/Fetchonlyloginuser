import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState("");
  const [rooms, setRoom] = useState([]);

  // Jwt token StoreIn LocalStore
  const storeTokenInLS = (serverToken) => {
    localStorage.setItem("token", serverToken);
    setToken(serverToken);
  };
  // Get Loggin User Data

  const fetchData = async () => {
    if (!token) return;
    try {
      const response = await fetch("http://localhost:5151/user/", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.userData);
      } else {
        console.log("Error fetching user data");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const isAdmin = user.role === "admin";

  useEffect(() => {
    fetchData();
  }, [token]);

  // get All Room Data

  const fetchRooms = async () => {
    try {
      const response = await fetch("http://localhost:5151/room/");
      const data = await response.json();
      setRoom(data);
      console.log(rooms);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <AuthContext.Provider
      value={{ storeTokenInLS, user, token, isAdmin, rooms,fetchRooms }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
