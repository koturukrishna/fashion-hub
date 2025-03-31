import React, { useEffect, useState } from "react";
import "./CSS/LoginSignup.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginSignup = () => {
  const [signedUser, setSignedUser] = useState(false);
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState(() => ({
    ...(signedUser ? {} : { username: "" }),
    email: "",
    password: "",
  }));

  useEffect(() => {
    setUserDetails((prev) => ({
      ...(signedUser ? {} : { username: "" }),
      email: prev.email,
      password: prev.password,
    }));
  }, [signedUser]);

  const { username, email, password } = userDetails;

  const handleChange = (event) => {
    const { target } = event;
    setUserDetails((prev) => ({ ...prev, [target.name]: target.value }));
  };

  const handleRegistrationSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/auth/register",
        userDetails
      );
      // console.log("response", response);

      if (response.statusText) {
        console.log("Registration done Successfull");
        toast.success("Registration done Successfully", {
          position: "top-center",
          autoClose: 2000, // Auto dismiss in 3 seconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
        setSignedUser(true);
      }
    } catch (error) {
      console.log("Registration failed", error);

      toast.error(error.response.data.message, {
        position: "top-center",
        autoClose: 2000,
      });
    }
    setUserDetails({
      ...(!signedUser && { username: "" }),
      email: "",
      password: "",
    });
  };

  const handleLoggedInUSer = async () => {
    try {
      const url = "http://localhost:5000/auth/login";
      const { data: res } = await axios.post(url, userDetails);
      console.log("login response", res);

      localStorage.setItem("token", res.token);
      navigate("/");
    } catch (error) {
      console.log("Error", error);
      toast.error(error.respone.data.message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    }
    // console.log("userDetails", userDetails);
    setUserDetails({
      ...(!signedUser && { username: "" }),
      email: "",
      password: "",
    });
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        {!signedUser ? (
          <div>
            <h1>Sign Up</h1>
            <div className="loginsignup-fields">
              <input
                type="text"
                placeholder="Your Name"
                name="username"
                value={username}
                onChange={handleChange}
              />
              <input
                type="email"
                placeholder="Email Address"
                name="email"
                value={email}
                onChange={handleChange}
              />
              <input
                type="password"
                name="password"
                placeholder="password"
                value={password}
                onChange={handleChange}
              />
            </div>
            {/* <div className="loginsignup-agree">
           <input type="checkbox" name="" id="" />
          <p>By continuing, i agree to the terms of use & privacy policy.</p>
        </div> */}
            <button onClick={handleRegistrationSubmit}>Continue</button>
            <p className="loginsignup-login">
              Already have an account?
              <span
                style={{
                  textDecoration: "none",
                  cursor: "pointer",
                }}
                onClick={() => setSignedUser(!signedUser)}
              >
                Login here
              </span>
            </p>
          </div>
        ) : (
          <div>
            <h1>Login In</h1>
            <div className="loginsignup-fields">
              <input
                type="email"
                placeholder="Email Address"
                name="email"
                value={email}
                onChange={handleChange}
              />
              <input
                type="password"
                name="password"
                placeholder="password"
                value={password}
                onChange={handleChange}
              />
              <button onClick={handleLoggedInUSer}>Continue</button>
              <p className="loginsignup-login">
                don't have account reate account? &nbsp;
                <span
                  style={{
                    textDecoration: "none",
                    cursor: "pointer",
                  }}
                  onClick={() => setSignedUser(!signedUser)}
                >
                  SingIn here
                </span>
              </p>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginSignup;
