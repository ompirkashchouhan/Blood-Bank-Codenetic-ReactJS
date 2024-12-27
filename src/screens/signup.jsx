import React, { useContext, useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import "../styles/login.css";
import * as bootstrap from "bootstrap";
import Form from "react-bootstrap/Form";
import BloodLogo from "../assets/images/blood-logo.jpg";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import swal from "sweetalert";
import Button from "react-bootstrap/Button";
import InternetErrorImg from "../assets/images/wifi-slash.png";
import InputGroup from "react-bootstrap/InputGroup";
import { Link, useNavigate } from "react-router-dom";
import MyContext from "../context/context";

function Signup() {
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

  const {
    SignUpEmailAndPassword,
    userName,
    setuserName,
    email,
    setemail,
    password,
    setpassword,
    phone,
    setphone,
    age,
    setAge,
    whoAreYou,
    setwhoAreYou,
    city,
    setcity,
    imageUrl,
    setimageUrl,
  } = useContext(MyContext);
  const navigate = useNavigate();

  const trimUserName = userName.trim();
  const trimEmail = email.trim();
  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  const trimPass = password.trim();
  const trimNumber = phone.trim();
  const trimAge = age.trim();
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasDigits = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const navContent = async () => {
    if (trimUserName === "") {
      swal(
        "All fields are required. Kindly ensure the form is complete before submitting !",
        ""
      );
    } else if (trimEmail === "") {
      swal(
        "All fields are required. Kindly ensure the form is complete before submitting !",
        ""
      );
    } else if (!validateEmail(email)) {
      swal("Please enter a valid email address !", "");
    } else if (trimPass === "") {
      swal(
        "All fields are required. \n Kindly ensure the form is complete before submitting !",
        ""
      );
    } else if (trimPass.length < minLength) {
      swal("Password must be at least 8 characters !", "");
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
    } else if (trimNumber === "") {
      swal(
        "All fields are required. Kindly ensure the form is complete before submitting !",
        ""
      );
    } else if (trimNumber.length < 11) {
      swal("Your phone number must be exactly 11 digits long !", "");
    } else if (whoAreYou.trim() === "") {
      swal(
        "All fields are required. Kindly ensure the form is complete before submitting !",
        ""
      );
    } else if (whoAreYou === "Who Are You ?") {
      swal("Please Select Who Are You Field Donor/Reciever !", "");
    } else if (trimAge === "") {
      swal(
        "All fields are required. Kindly ensure the form is complete before submitting !",
        ""
      );
    } else if (Number(trimAge) < 22) {
      swal("You must be between 22 and 70 years old to donate blood !", "");
    } else if (Number(trimAge) > 70) {
      swal("You must be between 22 and 70 years old to donate blood !", "");
    } else if (city.trim() === "") {
      swal(
        "All fields are required. Kindly ensure the form is complete before submitting !",
        ""
      );
    } else if (imageUrl.trim() === "") {
      swal(
        "All fields are required. Kindly ensure the form is complete before submitting !",
        ""
      );
    } else {
      await SignUpEmailAndPassword();
      navigate("/");
    }
  };

  return (
    <div className={`app ${isOnline ? "" : "blurred"}`}>
      {!isOnline && (
        <div className="no-internet">
          <center>
            <img src={InternetErrorImg} width="30px" height="30px" />{" "}
            <span>No Internet Connection</span>
          </center>
        </div>
      )}

      <div className="AppSignup">
        <Helmet>
          <title>Sign-Up</title>
        </Helmet>
        <div className="_AppLogin">
          <section className="_InputSection">
            <div className="logoMainLogin">
              <img src={BloodLogo} alt="blood-bank-logo" />
              <h4 style={{ fontWeight: "bold" }}>Blood Bank</h4>
            </div>{" "}
            <br />
            <h4
              style={{
                fontWeight: "bold",
                marginTop: "20px",
                marginBottom: "30px",
              }}
            >
              Create an account
              <br />
              <span style={{ fontSize: "12px" }}>
                Welcome, please sign up to continue
              </span>
            </h4>
            <FloatingLabel controlId="floatingPassword" label="Username">
              <Form.Control
                type="text"
                value={userName}
                onChange={(e) => setuserName(e.target.value)}
                placeholder="Name"
                className="inputGroupLogin"
              />
            </FloatingLabel>
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
            <FloatingLabel controlId="floatingPassword" label="Phone Number">
              <Form.Control
                type="text"
                maxlength="11"
                oninput="this.value=this.value.replace(/[^0-9]/g,'')"
                value={phone}
                onChange={(e) => setphone(e.target.value)}
                placeholder="Phone Number"
                className="inputGroupLogin"
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label="Age">
              <Form.Control
                type="text"
                maxlength="3"
                oninput="this.value=this.value.replace(/[^0-3]/g,'')"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Age"
                className="inputGroupLogin"
              />
            </FloatingLabel>
            <Form.Select
              size="lg"
              value={whoAreYou}
              onChange={(e) => setwhoAreYou(e.target.value)}
              className="DropdownAgeLogin"
              style={{ marginBottom: "15px" }}
            >
              <option selected>Who Are You ?</option>
              <option value="Donor">Donor</option>
              <option value="Reciever">Reciever</option>
            </Form.Select>
            <FloatingLabel controlId="floatingPassword" label="City">
              <Form.Control
                type="text"
                value={city}
                onChange={(e) => setcity(e.target.value)}
                placeholder="City"
                className="inputGroupLogin"
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingPassword"
              label="Upload Image By URL"
            >
              <Form.Control
                type="url"
                value={imageUrl}
                onChange={(e) => setimageUrl(e.target.value)}
                placeholder="Upload Image By URL"
                className="inputGroupLogin"
              />
            </FloatingLabel>
            <Button
              variant="primary"
              className="_LoginSignupBtn"
              onClick={() => navContent()}
              style={{ width: "100%", marginTop: "30px" }}
            >
              Signup
            </Button>
            <p style={{ marginTop: "10px" }}>
              Already have an account? <Link to="/">Loginhere</Link>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

export { Signup };
