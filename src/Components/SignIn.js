import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const SignIn = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const Navigate = useNavigate();

  const handlInput = (e) => {
    console.log(e);
    let { name, value } = e.target;

    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = JSON.parse(localStorage.getItem("signupData"));
    const foundUser = userData.find(
      (storedUser) =>
        storedUser.email === user.email && storedUser.password === user.password
    );
    if (foundUser) {
      alert("login Successfull");
      localStorage.setItem("loggedinUser", JSON.stringify(foundUser));
      Navigate("/");
    } else {
      alert("Invalid email & Password");
    }
  };

  return (
    <>
      <section>
        <main>
          <div className="section-registration">
            <div className="container grid grid-two-cols card w-25 mt-5">
              <div className="registration-image"></div>
              <div className="registration-form mt-2">
                <h1 className="main-heading mb-3 text-center">Login</h1> <br />
                <form onSubmit={handleSubmit}>
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
                      autoComplete="off"
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
                      autoComplete="off"
                      value={user.password}
                      onChange={handlInput}
                      required
                    />
                  </div>
                  <div className="d-grid mt-4">
                    <button className="btn btn-primary " type="submit">
                      Login
                    </button>
                  </div>
                  <p className="text-center mt-3">
                    Not Register Please?
                    <NavLink to="/signup"> Sign Up </NavLink>
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
export default SignIn;
