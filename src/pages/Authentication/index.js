import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import auth from "../../../firebase";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../Redux/features/userSlice";

export const AuthContext = createContext();

const Authentication = ({ children }) => {
  const [user, setUser] = useState();
  const dispatch = useDispatch();

  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };


  const loginUser = (email, password) =>{
    return signInWithEmailAndPassword(auth, email, password)
  }

  const signOutUser = () => {
  
    signOut(auth)
      .then(() => {
        // After successfully signing out, reset the user slice to initial state
        dispatch(logoutUser());
        localStorage.removeItem("user")
        console.log('User signed out successfully');
      })
      .catch((error) => {
        console.error('Error signing out:', error);
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  const authInfo = {
    loginUser,
    signUp,
    user,
    signOutUser
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default Authentication;
