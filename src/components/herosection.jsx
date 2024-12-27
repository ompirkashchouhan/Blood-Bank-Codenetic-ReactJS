import React, { useContext, useEffect, useState } from "react";
import "./../styles/home.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { byPrefixAndName,faEdit } from '@fortawesome/free-solid-svg-icons';
import { Link, Element, animateScroll as scroll } from "react-scroll";
import HeroSectionImg from "../assets/images/HeroSectionImage.jpg";
import AboutSectionImg from "../assets/images/AboutSection.jpg";
import DrSarahImg from "../assets/images/drsarahkhan.jpeg";
import DrAliRazaImg from "../assets/images/dr-ali-raza.jpeg";
import DrMariaImg from "../assets/images/dr-maria.jpg";
import DrAhmedImg from "../assets/images/dr-ahmed-zafar.jpeg";
import DummyProfile from "../assets/images/dummyProfile.jpeg";
import { Button, Form, Card } from "react-bootstrap";
import MyContext from "../context/context";
import swal from "sweetalert";
import {
  collection,
  getDocs,
  db,
  query,
  where,
  auth,
  onAuthStateChanged,
} from "../init-firebase";
import { useNavigate } from "react-router-dom";

function HeroSection() {
  return (
    <>
      <section class="hero">
        <div class="hero-content">
          <h1>Save a Life</h1>
          <p>
            Donate blood, save lives. Your blood donation can make a difference.
            Join us in our mission to provide life-saving blood to those in
            need.
          </p>

          <Link to="donate-now" className="btn" smooth={true} duration={500}>
            Donate
          </Link>
        </div>
        <div class="hero-image">
          <img src={HeroSectionImg} alt="Donate Blood" />
        </div>
      </section>
    </>
  );
}

function AboutSection() {
  return (
    <>
      <section class="about">
        <div class="about-image">
          <img src={AboutSectionImg} alt="Blood Donation Symbol" />
        </div>
        <div class="about-content">
          <h2>About Blood Donors</h2>
          <p>
            Blood donation is one of the most significant contributions that a
            person can make towards society. Every day, thousands of patients
            rely on the generosity of donors to save their lives.
          </p>
          <p>
            We are committed to connecting donors with those in need. Join us in
            this mission to make the world a healthier and safer place.
          </p>
          <p>
            Your donation can help save lives, one drop at a time. Together, we
            can make a difference!
          </p>
        </div>
      </section>
    </>
  );
}

function DonateSecion() {
  const [donateGroups, setdonateGroups] = useState("");
  const { AddDonate } = useContext(MyContext);

  return (
    <>
      <Element name="donate-now">
        <div className="donateMainSection">
          <div className="innerDonateMain">
            <Form.Select
              style={{marginTop : "20px"}}
              aria-label="Default select example"
              value={donateGroups}
              onChange={(e) => setdonateGroups(e.target.value)}
              className="SelectDropdownBlood"
            >
              <option>-- Select Blood Group --</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </Form.Select>
            <Button
              variant="outline-primary"
              style={{marginTop : "20px"}}
              onClick={()=>AddDonate(donateGroups)}
            >
              Donate
            </Button>
          </div>
        </div>
      </Element>
    </>
  );
}

function AvailabelDonors() {
  const [donors, setDonors] = useState({});

  useEffect(() => {
    const fetchDonors = async () => {
      const donorData = {};
      try {
        // Firestore Query: Filter only documents where userType == "Donors"
        const q = query(
          collection(db, "Donors"),
          where("UserType", "==", "Donor")
        );
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          donorData[data.BloodGroup] = (donorData[data.BloodGroup] || 0) + 1;
        });

        setDonors(donorData);
      } catch (error) {
        console.error("Error fetching donors: ", error);
      }
    };

    fetchDonors();
  }, []);

  return (
    <>
      <section class="blood-bank">
        <h1>Available Donors</h1>
        <p>
          Below are the available blood donors with their respective blood
          groups.
        </p>

        <div class="donor-group">
          {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((group) => (
            <div className="group-item" key={group}>
              <h3>{group}</h3>
              <ul>
                <li>Number of Donor's</li>
                <li style={{ color: "blue" }}>{donors[group] || 0}</li>
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function AvailabelRecievers() {
  const [receivers, setReceivers] = useState({});

  useEffect(() => {
    const fetchReceivers = async () => {
      const receiversData = {};
      try {
        // Firestore Query: Filter only documents where userType == "Donors"
        const q = query(
          collection(db, "Donors"),
          where("UserType", "==", "Reciever")
        );
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          receiversData[data.BloodGroup] =
            (receiversData[data.BloodGroup] || 0) + 1;
        });

        setReceivers(receiversData);
      } catch (error) {
        console.error("Error fetching donors: ", error);
      }
    };

    fetchReceivers();
  }, []);

  return (
    <>
      <section class="blood-bank">
        <h1>Available Recievers</h1>
        <p>
          Below are the available blood recievers with their respective blood
          groups.
        </p>

        <div class="donor-group">
          {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((group) => (
            <div className="group-item" key={group}>
              <h3>{group}</h3>
              <ul>
                <li>Number of Recievers's</li>
                <li style={{ color: "blue" }}>{receivers[group] || 0}</li>
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function MainSectionDonors() {

  const [bloodGroup, setBloodGroup] = useState("");
  const [userType, setUserType] = useState("");
  const [city, setCity] = useState("");
  const [donors, setDonors] = useState([]);

  const searchDonors = async () => {
    const donorRef = collection(db, "Donors");
    let donorQuery = query(donorRef);
    
    // Add filters to the query based on user selection

    if (bloodGroup) {
      donorQuery = query(donorQuery, where("BloodGroup", "==", bloodGroup));
    }
    if (userType) {
      donorQuery = query(donorQuery, where("UserType", "==", userType));
    }
    if (city) {
      donorQuery = query(donorQuery, where("City", "==", city.toLowerCase()));
    }
    
    try {
      if(bloodGroup && userType && city){
        swal("Searching . . .",userType)
        const querySnapshot = await getDocs(donorQuery);
        const results = [];
        querySnapshot.forEach((doc) => {
          results.push({ id: doc.id, ...doc.data()});
        });
        setDonors(results);
      }else{
        swal("All Fields Required !","")
      }
    } catch (error) {
      alert("An error occurred while fetching donors. Please try again later.");
      console.error("Error fetching donors:", error);
    }
  };


  return (
    <>
      <section className="_SectionMainDonors">
        <div className="_innerSectionMain">
          <h3>Find Donors | Recievers</h3>
          <br />
          <div className="donorBody">
            <Form.Select
              className="_dropdownsDonor"
              aria-label="Default select example"
              onChange={(e) => setBloodGroup(e.target.value)}
            >
              <option>Select Your Blood</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </Form.Select>
            <Form.Select
              className="_dropdownsDonor"
              aria-label="Default select example"
              onChange={(e) => setUserType(e.target.value)}
            >
              <option selected value=''>UserType</option>
              <option value="Donor" >Donor</option>
              <option value="Reciever">Reciever</option>
            </Form.Select>
            <Form.Control
              type="text"
              className="_dropdownsDonor"
              placeholder="City"
              onChange={(e) => setCity(e.target.value)}
            />
            <Button
              variant="primary"
              className="_dropdownsDonor"
              style={{ marginTop: "-0px" }}
              onClick={()=> searchDonors()}
            >
              Search
            </Button>
          </div>
          <br />
          <br />
        </div>

        
      </section>
      <section className="ResultsList">
        <div className="results">
          <h1>
            {userType === "Donor" 
            ? "Available Donors" 
            : userType === "Receiver" 
            ? "Available Receivers" 
            : "Available Receivers"}
          </h1>
            {donors.length > 0 ? (
              donors.map((donors) => (

                <Card key={donors.id} className="donorCard">
                  <Card.Body>
                    <img src={donors.ImageUrl? donors.ImageUrl  : DummyProfile} className="CardImage" alt="Img" style={{width : '80px' , height : '80px' , borderRadius : '50%' , border : '2px solid #8a0303' , marginBottom : '20px'}} />
                    <Card.Title style={{color : '#8a0303'}}>{donors.Name}</Card.Title>
                    <Card.Text>
                      <strong>Blood Group:</strong> {donors.BloodGroup} <br />
                      <strong>User Type:</strong> {donors.UserType} <br />
                      <strong>City:</strong> {donors.City} <br />
                      <strong>Email:</strong> {donors.Email} <br />
                      <strong>Mobile No:</strong> {donors.PhoneNo}
                    </Card.Text>
                  </Card.Body>
                </Card>
              ))
            ) : (
              <center>
                <br />
                <br />
                <center><p>No results found</p></center>
              </center>
            )}
        </div>
      </section>
    </>
  );
}

function OurTeamSection() {
  return (
    <>
      <section class="team-section">
        <div class="teamMain">
          <h1 class="section-title">Meet Our Health Experts</h1>
          <p class="section-description">
            Our dedicated team of professionals is here to ensure your health
            and well-being.
          </p>

          <div class="team-grid">
            <div class="team-card">
              <img src={DrSarahImg} alt="Dr. Sarah Khan" class="team-img" />
              <h3 class="team-name">Dr. Sarah Khan</h3>
              <p class="team-role">Cardiologist</p>
            </div>

            <div class="team-card">
              <img src={DrAliRazaImg} alt="Dr. Ali Raza" class="team-img" />
              <h3 class="team-name">Dr. Ali Raza</h3>
              <p class="team-role">Neurologist</p>
            </div>

            <div class="team-card">
              <img src={DrMariaImg} alt="Dr. Maria Aslam" class="team-img" />
              <h3 class="team-name">Dr. Maria Aslam</h3>
              <p class="team-role">Pediatrician</p>
            </div>

            <div class="team-card">
              <img src={DrAhmedImg} alt="Dr. Ahmed Zafar" class="team-img" />
              <h3 class="team-name">Dr. Ahmed Zafar</h3>
              <p class="team-role">General Physician</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ProfileSection() {
  const [allDetailsUser, setallDetailsUser] = useState({});
  const [nowUser, setnowUser] = useState({});
  const navigate = useNavigate();

  const getPreviousDataUser = () => {
    const getCurrentUser = () => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const currentProfileuser = user;
          setnowUser(user);
          const querySnapshot = await getDocs(collection(db, "users"));
          querySnapshot.forEach((doc) => {
            const userData = doc.data();
            if (currentProfileuser.email === userData.Email) {
              setallDetailsUser(doc.data());
            }
            console.log(`${doc.id} => ${doc.data()}`);
          });
        }
      });
    };
    getCurrentUser();
  };

  console.log("ALL DETAILS > > > > >", allDetailsUser);

  useEffect(() => {
    getPreviousDataUser();
  }, []);

  return (
    <>
      <div class="profile-container">
        <div class="profile-header">
          <h1>Blood Bank Profile</h1>
          <p>Save a Life, Be a Hero</p>
        </div>

        <div class="profile-content">

          <div class="profile-image">
            <img src={allDetailsUser? allDetailsUser.ImageUrl  : DummyProfile} alt="Profile Pic" />
          </div>

          <div class="profile-details">
            <h2>User Information</h2>
            <p>
              <span>Full Name:</span> {allDetailsUser.Name}
            </p>
            <p>
              <span>Email Address:</span> {allDetailsUser.Email}
            </p>
            <p>
              <span>Age:</span> {allDetailsUser.Age}
            </p>
            <p>
              <span>Contact:</span> {allDetailsUser.PhoneNo}
            </p>
            <p>
              <span>City :</span> {allDetailsUser.City}
            </p>
          </div>
        </div>
        <Button
            variant="primary"
            onClick={() => navigate("/updateprofile")}
            className="updateProfileBtn"
            size="sm"
          >
           
        <FontAwesomeIcon icon={faEdit}/> Edit Profile
          </Button>
      </div>
    </>
  );
}


export {
  HeroSection,
  AboutSection,
  DonateSecion,
  AvailabelDonors,
  AvailabelRecievers,
  MainSectionDonors,
  OurTeamSection,
  ProfileSection,
};