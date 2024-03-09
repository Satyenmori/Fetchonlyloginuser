import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    time: "",
  });
  const Navigate = useNavigate();

  const handlInput = (e) => {
    console.log(e);
    let { name, value } = e.target;

    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

  };

  return (
    <>
      <section>
        <main>
          <div className="section-registration">
            <div className="container grid grid-two-cols card w-25 mt-5">
              <div className="registration-image"></div>
              <div className="registration-form mt-2">
                <h1 className="main-heading mb-3 text-center">Registration</h1>{" "}
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
                      Register Now
                    </button>
                  </div>
                  <p className="text-center mt-3">
                    Already Register ? <NavLink to="/login">Login </NavLink>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};

export default SignUp;
