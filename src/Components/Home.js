import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const loggedinUser =
      JSON.parse(localStorage.getItem("loggedinUsers")) || [];

    setUserData(loggedinUser);
  }, []);

  // Delete User

  const deleteuser = (id) => {
    let loggedInUsers = JSON.parse(localStorage.getItem("loggedinUsers")) || [];

    const updatedUser = loggedInUsers.filter((user) => user.id !== id);

    localStorage.setItem("loggedinUsers", JSON.stringify(updatedUser));
    setUserData(updatedUser);
    alert("User Delete Successfully");
  };

  return (
    <>
      <table class="table container w-50  mt-5 ">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Password</th>
            <th scope="col">Date & Time</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user) => (
            <tr key={user.id}>
              <th scope="row">{user.id}</th>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>{user.time}</td>
              <td>
                <Link to={`update/${user.id}/edit`} className="edit">
                  <i className="fa-regular fa-pen-to-square"></i>
                </Link>
                <button className="delete" onClick={() => deleteuser(user.id)}>
                  <i className="fa-solid fa-trash fa"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Home;
