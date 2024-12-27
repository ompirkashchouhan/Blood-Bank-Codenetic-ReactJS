import React, { useEffect, useState } from "react";
import MyContext from "./context";
import swal from "sweetalert";
import {
  auth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut
} from "../init-firebase";
import { db, addDoc, collection , getDocs , onAuthStateChanged , setDoc , query , where , doc, updateDoc , sendPasswordResetEmail , signInWithPopup , provider , GoogleAuthProvider} from "../init-firebase";
import { useNavigate } from "react-router-dom";
import { start } from "@popperjs/core";

// My Provider Function =>

const MyProvider = ({ children }) => {
  const [userName, setuserName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [phone, setphone] = useState("");
  const [age, setAge] = useState("");
  const [whoAreYou, setwhoAreYou] = useState("");
  const [city, setcity] = useState("");
  const [imageUrl, setimageUrl] = useState("");
    
  // User Sign Up With Email And Password
  const SignUpEmailAndPassword = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      swal("Registered!", "You clicked the button!", "success");
      const user = userCredential.user;
      console.log(user.uid);
      let uidCurrent = user.uid;

      await setDoc(doc(db, "users", userCredential.user.uid), {
        Name: userName,
        Email: email,
        PhoneNo: phone,
        Age: age,
        UserType: whoAreYou,
        City: city,
        ImageUrl: imageUrl,
      });

      // Update the user's profile
      await updateProfile(auth.currentUser, {
        displayName: userName,
        photoURL : imageUrl
      });

      setuserName("");
      setemail("");
      setpassword("");
      setAge("");
      setphone("");
      setwhoAreYou("");
      setcity("");
      setimageUrl("");
    } catch (error) {
      let errorMessage = error.message;
      if(error.code === "auth/email-already-in-use"){
        swal(`${"The email address is use in another account !"}`);
      }else if(error.code === "auth/network-request-failed"){
        swal("No internet ! Please check your internet connection .")
      }else{
        swal(`${error.code}`)
      }
    }
  };

  // User Sign In
  const SignInEmailPassword = async (navigate) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        swal("Login Successfully!", "You clicked the button!", "success");
        setemail('')
        setpassword('')
        navigate('/home')
      })
      .catch((error) => {
        if(error.code === "auth/invalid-credential"){
          swal("Please Enter Your Correct \n Email And Password !");
        }
      });
  };
  
  // User Sign Out
  const SignOutUser = async () => {
    await signOut(auth).then(() => {
       swal("Log Out Successfully !", "You clicked the button!" , "success");
    }).catch((error) => {
      swal(`${error.code}`, "")
    });
  }

  // User Forgot Password By Send Email
  const ForgotPassword = (forgotEmail) => {
    sendPasswordResetEmail(auth, forgotEmail )
    .then(() => {
      swal("Email Send Successfully 😊", "");
    })
    .catch((error) => {
      swal(`${error.code}`);
    });
  }
  
  // Add Donor Button Home Page
  const AddDonate = (donateGroups) => {

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const currentProfileUser = user.email;

       const querySnapshot = await getDocs  (collection(db, "users"));
        querySnapshot.forEach(async(doc) => {
          const userData = doc.data();

          if(currentProfileUser === userData.Email){

            const q = query(collection(db, "Donors"), where("Email", "==", userData.Email));
            const querySnapshot = await getDocs(q);

            if(querySnapshot.empty){
              if(donateGroups === ""){
                swal("Please Select Your Blood Group !","")
              } else if(donateGroups === "-- Select Blood Group --"){
                swal("Please Select Your Blood Group !","")
              } else{
                try {
                  const docRef = await addDoc(collection(db, "Donors"), {
                    Name: userData.Name,
                    Email: userData.Email,
                    PhoneNo: userData.PhoneNo,
                    Age: userData.Age,
                    UserType: userData.UserType,
                    City: userData.City.toLowerCase(),
                    ImageUrl: userData.ImageUrl,
                    BloodGroup: donateGroups,
                  });
                  console.log("Document written with ID: ", docRef.id);
                  swal("You're Now Become a Donor .", "You clicked the button!" , "success");
                } catch (e) {
                  console.error("Error adding document: ", e);
                }
              }
            }else{
              swal("You're Already a Donor !", "")
            }
          }
          console.log(doc.id, " => ", doc.data());
        });
      } else {
        console.log("User Not Login Please Logged In !?")
      }
    })} 

  return (
    <MyContext.Provider
      value={{
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
        SignInEmailPassword,
        SignOutUser,
        AddDonate,
        ForgotPassword,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export default MyProvider;
