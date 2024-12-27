import React from "react";
import { Helmet } from "react-helmet";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../screens/login";
import { Signup } from "../screens/signup";
import Home from "../screens/home";
import Donor from "../screens/donor";
import Profile from "../screens/profile";
import UpdateProfilePage from "../screens/updateprofile";
import ForgotPass from "../screens/forgotpass";


const Router = () => {
  return (
    <BrowserRouter>
      <Routes> 
        <Route path="/" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="home" element={<Home />} />
        <Route path="/donor" element={<Donor />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/updateprofile" element={<UpdateProfilePage />} />
        <Route path="/forgotpass" element={<ForgotPass />} />

      </Routes>
    </BrowserRouter>
  );
};
 
export default Router;