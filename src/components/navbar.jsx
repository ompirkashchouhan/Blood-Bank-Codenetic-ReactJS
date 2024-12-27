import React, { useContext, useEffect, useState } from "react";
import * as bootstrap from "bootstrap";
import "./../styles/navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { auth, onAuthStateChanged } from "../init-firebase";
import MyContext from "../context/context";
import { Container , Button , Nav , Offcanvas , Navbar} from "react-bootstrap";

function MyNavbar() {
  const { SignOutUser } = useContext(MyContext);
  const [currentusername, setcurrentusername] = useState();

  const getCurrentUser = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setcurrentusername(user.displayName);
      } else {
        navigate("/");
      }
    });
  };
  useEffect(() => {
    getCurrentUser();
  }, []);
  const navigate = useNavigate();
  return (
    <>
      {["md"].map((expand) => (
        <Navbar key={expand} expand={expand} className="MyNavbar">
          <Container
            className="MyNavbarContainer"
            fluid
            style={{ marginTop: "20px", height: "20px" }}
          >
            <Navbar.Brand
              href=""
              onClick={() => navigate("/home")}
              style={{
                marginLeft: "20px",
                cursor: "pointer",
                color: "white",
                fontWeight: "bold",
              }}
            >
              Blood Bank
            </Navbar.Brand>
            <Navbar.Toggle
              aria-controls={`offcanvasNavbar-expand-${expand}`}
              style={{ boxShadow: "none", border: "none" }}
            />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header
                style={{ backgroundColor: "#8a0303" }}
                closeButton
              >
                <Offcanvas.Title
                  id={`offcanvasNavbarLabel-expand-${expand}`}
                  style={{
                    marginLeft: "20px",
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  Blood Bank
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body className="MyNavOffCanvasBody">
                <Nav
                  style={{ gap: "35px" }}
                  className="justify-content-center flex-grow-1 pe-3"
                >
                  <Nav.Link
                    href=""
                    onClick={() => navigate("/home")}
                    className="nav-link"
                    style={{ color: "white", fontWeight: "bold" }}
                  >
                    Home
                  </Nav.Link>
                  <Nav.Link
                    href=""
                    onClick={() => navigate("/donor")}
                    className="nav-link"
                    style={{ color: "white", fontWeight: "bold" }}
                  >
                    Donors
                  </Nav.Link>
                  <Nav.Link
                    href=""
                    onClick={() => navigate("/profile")}
                    className="nav-link"
                    style={{ color: "white", fontWeight: "bold" }}
                  >
                    Profile
                  </Nav.Link>
                </Nav>
                <span
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    marginTop: "10px",
                    marginRight: "20px",
                  }}
                >
                  {currentusername}
                </span>
                <Button
                  variant="outline-light"
                  onClick={() => {
                    SignOutUser();
                    navigate("/");
                  }}
                >
                  LogOut
                </Button>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default MyNavbar;
