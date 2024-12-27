import React, { useContext, useEffect, useState } from "react";
import swal from "sweetalert";
import { Helmet } from "react-helmet";
import "../styles/login.css";
import BloodLogo from "../assets/images/blood-logo.jpg";
import * as bootstrap from "bootstrap";
import GoogleIcon from "../assets/images/googleIcon.png";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { Link, useNavigate } from "react-router-dom";
import MyContext from "../context/context";
import InternetErrorImg from "../assets/images/wifi-slash.png";
import { onAuthStateChanged, auth } from "../init-firebase";

function Login() {

  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    // Event listeners for online/offline
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Cleanup listeners on component unmount
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);



  // if current user is already logged in then redirect to home page
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setTimeout(() => {
          navigate("/home");
          <div className="loader"></div>
        }, 2000);
      }
    });
  }, []);

  const navigate = useNavigate();
  const { SignInEmailPassword, email, setemail, password, setpassword } =
    useContext(MyContext);
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasDigits = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  const singedIn = async () => {
    if (email.trim() === "") {
      swal(
        "All fields are required. Kindly ensure the form is complete before submitting !",
        ""
      );
    } else if (!validateEmail(email)) {
      swal("Please enter a valid email address !", "");
    } else if (email.trim() === "") {
      swal(
        "All fields are required. Kindly ensure the form is complete before submitting !",
        ""
      );
    } else if (password.trim().length < minLength) {
      swal("Password must be at least 8 characters !", "");
    } else if (password.trim() === "") {
      swal(
        "All fields are required. Kindly ensure the form is complete before submitting !",
        ""
      );
    } else if (!hasUpperCase) {
      swal("Password must contain at least one uppercase letter !", "");
    } else if (!hasLowerCase) {
      swal("Password must contain at least one lowercase letter !", "");
    } else if (!hasDigits) {
      swal("Password must contain at least one number !", "");
    } else if (!hasSpecialChar) {
      swal(
        "Password must contain at least one special character or symbol !",
        ""
      );
    } else {
      await SignInEmailPassword(navigate);
    }
  };
  return (
    <>
      <div className={`app ${isOnline ? "" : "blurred"}`}>
        {!isOnline && (
          <div className="no-internet">
            <center>
              <img src={InternetErrorImg} width="30px" height="30px" />
              <span>No Internet Connection</span>
            </center>
          </div>
        )}

        <div className="_AppLogin">
          <Helmet>
            <title>Login</title>
          </Helmet>
          <section className="_InputSection">
            <div className="logoMainLogin">
              <img src={BloodLogo} alt="blood-bank-logo" />
              <h4 style={{ fontWeight: "bold" }}>
                <span className="_bloodText">Blood</span> Bank
              </h4>
            </div>{" "}
            <br />
            <h4
              style={{
                fontWeight: "bold",
                marginTop: "20px",
                marginBottom: "30px",
              }}
            >
              Login Account
              <br />
              <span style={{ fontSize: "12px" }}>
                Welcome, please sign in to continue
              </span>
            </h4>
            <FloatingLabel
              controlId="floatingInput"
              label="Email address"
              className="mb-3"
            >
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                placeholder="name@example.com"
                className="inputGroupLogin"
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label="Password">
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                placeholder="Password"
                className="inputGroupLogin"
              />
            </FloatingLabel>
            <Button
              variant="primary"
              className="_LoginSignupBtn"
              onClick={() => singedIn()}
              style={{ width: "100%", marginTop: "30px" }}
            >
              Login
            </Button>
            <p style={{ marginTop: "10px" }}>
              Don`t have an account? <Link to="/signup">SignUphere</Link>
            </p>
            <center>
              <Link to="/forgotpass">Forgot Password</Link>
            </center>
          </section>
        </div>
      </div>
    </>
  );
}

export default Login;
