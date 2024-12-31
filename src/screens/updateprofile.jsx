import React, { useEffect, useState } from "react";
import "../styles/profile.css";
import { Helmet } from "react-helmet";
import swal from "sweetalert";
import MyNavbar from "../components/navbar";
import Footer from "../components/footer";
import { useNavigate } from "react-router-dom";
import InternetErrorImg from "../assets/images/wifi-slash.png";
import { auth, db, doc, getDoc, setDoc, updateDoc } from "../init-firebase";

function UpdateProfilePage() {
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

  const [userData, setUserData] = useState({
    Name: "",
    Email: "",
    Age: "",
    PhoneNo: "",
    City: "",
  });

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const user = auth.currentUser;

      if (!user) {
        console.error("No user logged in.");
        setLoading(false);
        return;
      }

      const userDocRef = doc(db, "users", user.uid);

      try {
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          setUserData(userDoc.data());
        } else {
          const defaultData = {
            Name: user.displayName || "Anonymous",
            Email: user.email || "No Email",
            Age: "",
            PhoneNo: "",
            City: "",
          };
          await setDoc(userDocRef, defaultData);
          setUserData(defaultData);
        }
      } catch (error) {
        console.error("Error fetching user data: ", error);
        alert("Failed to load profile. Please try again.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    const user = auth.currentUser;

    if (!user) {
      alert("You must be logged in to update your profile.");
      return;
    }
    if (
      !userData.Name ||
      !userData.Age ||
      !userData.PhoneNo ||
      !userData.City
    ) {
      alert("All fields except email are required.");
      return;
    }

    const userDocRef = doc(db, "users", user.uid);

    try {
      console.log("Updating user data:", userData);
      await updateDoc(userDocRef, {
        Name: userData.Name,
        Age: userData.Age,
        PhoneNo: userData.PhoneNo,
        City: userData.City,
      });
      swal("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile: ", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
      <div className={`app ${isOnline ? "" : "blurred"}`}>
        <MyNavbar />
        {!isOnline && (
          <div className="no-internet">
            <center>
              <img src={InternetErrorImg} width="30px" height="30px" />{" "}
              <span>No Internet Connection</span>
            </center>
          </div>
        )}
        <Helmet>
          <title>Update Profile</title>
        </Helmet>
        <div className="profile-container">
          <h3>Blood Profile Update</h3>

          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="Name" // Changed name to match userData.Name
              placeholder="Enter your full name"
              value={userData.Name || ""}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="Email" // Changed name to match userData.Email
              disabled
              placeholder="Enter your email address"
              value={userData.Email || ""}
            />
          </div>

          <div className="form-group">
            <label htmlFor="age">Age</label>
            <input
              type="number"
              id="age"
              name="Age" // Changed name to match userData.Age
              placeholder="Enter your age"
              value={userData.Age || ""}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="contact">Contact Number</label>
            <input
              type="tel"
              id="contact"
              name="PhoneNo" // Changed name to match userData.PhoneNo
              placeholder="Enter your contact number"
              value={userData.PhoneNo || ""}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="cityname">City</label>
            <input
              type="text"
              id="cityname"
              name="City" // Changed name to match userData.City
              placeholder="Enter your city name"
              value={userData.City || ""}
              onChange={handleChange}
            />
          </div>
          <button
            onClick={handleUpdate}
            style={{
              outline: "none",
              border: "none",
              backgroundColor: "#8a0303",
              color: "white",
              fontWeight: "bold",
              padding: "10px",
              borderRadius: "5px",
              marginLeft: "10px",
            }}
          >
            Update Profile
          </button>
        </div>
        <Footer />
      </div>
  );
}

export default UpdateProfilePage;
