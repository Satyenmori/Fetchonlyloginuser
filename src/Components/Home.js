import { useEffect, useState } from "react";

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

    const deleteUserid = loggedInUsers.findIndex((user) => user.id === id);
    if (deleteUserid !== -1) {
      loggedInUsers.splice(deleteUserid, 1);
      localStorage.setItem("loggedinUsers", JSON.stringify(loggedInUsers));
      setUserData(loggedInUsers);
      alert("User Delete Successfully");
    } else {
      alert("User Not Found");
    }
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
          {userData.map((user, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>{user.time}</td>
              <td>
                <button className="edit">
                  <i className="fa-regular fa-pen-to-square"></i>
                </button>
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
