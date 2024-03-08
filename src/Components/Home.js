import { useEffect, useState } from "react";

const Home = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const loggedinUser = JSON.parse(localStorage.getItem("loggedinUsers")) || [];

    setUserData(loggedinUser);
  }, []);
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
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Home;
