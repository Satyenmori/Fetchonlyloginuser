import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserUpdate = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    time: "",
  });
  const Navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userToUpdate")) || {};
    setUser(userData);
  }, []);

  const handlInput = (e) => {
    let { name, value } = e.target;

    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // User update logic
    const updatedUsers =
      JSON.parse(localStorage.getItem("loggedinUsers")) || [];
    const updatedUserData = updatedUsers.map((u) =>
      u.id === user.id ? user : u
    );
    localStorage.setItem("loggedinUsers", JSON.stringify(updatedUserData));
    localStorage.removeItem("userToUpdate");
    alert("User Details updated Successfuly !");
    Navigate("/");
  };

  return (
    <>
      <section>
        <main>
          <div className="section-registration">
            <div className="container grid grid-two-cols card w-25 mt-5">
              <div className="registration-image"></div>
              <div className="registration-form mt-2">
                <h1 className="main-heading mb-3 text-center">Update Data</h1>{" "}
                <br />
                <form onSubmit={handleSubmit}>
                  <div className="input-group flex-nowrap mb-3">
                    <span className="input-group-text" id="addon-wrapping">
                      <i className="fa-solid fa-user"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Username"
                      name="username"
                      id="username"
                      aria-label="Username"
                      aria-describedby="addon-wrapping"
                      value={user.username}
                      onChange={handlInput}
                      required
                    />
                  </div>
                  <div className="input-group flex-nowrap mb-3">
                    <span className="input-group-text" id="addon-wrapping">
                      <i className="fa-solid fa-envelope"></i>
                    </span>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      name="email"
                      id="email"
                      aria-label="email"
                      aria-describedby="addon-wrapping"
                      value={user.email}
                      onChange={handlInput}
                      required
                    />
                  </div>
                  <div className="input-group flex-nowrap mb-3">
                    <span className="input-group-text" id="addon-wrapping">
                      <i className="fa-solid fa-lock"></i>
                    </span>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      name="password"
                      id="password"
                      aria-label="password"
                      aria-describedby="addon-wrapping"
                      value={user.password}
                      onChange={handlInput}
                      required
                    />
                  </div>
                  <div className="input-group flex-nowrap mb-3">
                    <span className="input-group-text" id="addon-wrapping">
                      <i className="fa-solid fa-phone"></i>
                    </span>
                    <input
                      type="datetime-local"
                      className="form-control"
                      placeholder="Time"
                      name="time"
                      id="time"
                      aria-label="time"
                      aria-describedby="addon-wrapping"
                      value={user.time}
                      onChange={handlInput}
                    />
                  </div>
                  <div className="d-grid mt-4">
                    <button className="btn btn-primary " type="submit">
                      Update Now
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};

export default UserUpdate;
