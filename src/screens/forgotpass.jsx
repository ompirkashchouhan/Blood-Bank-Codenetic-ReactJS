import React, { useContext, useState, useEffect } from "react";
import swal from "sweetalert";
import { Helmet } from "react-helmet";
import "../styles/login.css";
import BloodLogo from "../assets/images/blood-logo.jpg";
import * as bootstrap from "bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { Link, useNavigate } from "react-router-dom";
import MyContext from "../context/context";
import InternetErrorImg from "../assets/images/wifi-slash.png";

function ForgotPass() {
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

  const navigate = useNavigate();
  const { ForgotPassword } = useContext(MyContext);
  const [forgotEmail, setforgotEmail] = useState("");
  function validateEmail(forgotEmail) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(forgotEmail);
  }
  const forgotPass = async () => {
    if (forgotEmail.trim() === "") {
      swal("Please Type Your Email Address !", "");
    } else if (!validateEmail(forgotEmail)) {
      swal("Please enter a valid email address !", "");
    } else if (forgotEmail.trim() === "") {
      swal(
        "All fields are required. Kindly ensure the form is complete before submitting !",
        ""
      );
    } else {
      await ForgotPassword(forgotEmail);
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
      <div className="_AppLogin" style={{ margin: "100px 0px" }}>
        <Helmet>
          <title>Forgot Pass</title>
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
            Forgot Password
            <br />
          </h4>
          <FloatingLabel
            controlId="floatingInput"
            label="Email address"
            className="mb-3"
          >
            <Form.Control
              type="email"
              value={forgotEmail}
              onChange={(e) => setforgotEmail(e.target.value)}
              placeholder="name@example.com"
              className="inputGroupLogin"
            />
          </FloatingLabel>
          <Button
            variant="primary"
            className="_LoginSignupBtn"
            onClick={() => forgotPass()}
            style={{ width: "100%" }}
          >
            Send Email Reset Password
          </Button>
          <p style={{ marginTop: "10px" }}>
            Go To Login | <Link to="/">Login</Link>
          </p>
        </section>
      </div>
    </div>
  );
}

export default ForgotPass;
