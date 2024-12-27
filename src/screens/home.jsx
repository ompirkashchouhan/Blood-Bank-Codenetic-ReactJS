import React, { useEffect , useState} from "react";
import { Helmet } from "react-helmet";
import MyNavbar from "../components/navbar";
import {HeroSection,AboutSection,DonateSecion , AvailabelDonors , AvailabelRecievers } from "../components/herosection";
import Footer from "../components/footer";
import InternetErrorImg from "../assets/images/wifi-slash.png";

function Home() {
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

  return (
    <>
    <div className={`app ${isOnline ? "" : "blurred"}`}>
      <MyNavbar/>
      {!isOnline && (
        <div className="no-internet">
          <center><img src={InternetErrorImg} width="30px" height="30px" /> <span>No Internet Connection</span></center>
        </div>
      )}
      <Helmet>
        <title>Home</title>
      </Helmet>
      <HeroSection/>
      <DonateSecion/>
      <AvailabelRecievers/>
      <AboutSection/>
      <AvailabelDonors/>
      <Footer/>
    </div>
    </>
  );
}

export default Home;