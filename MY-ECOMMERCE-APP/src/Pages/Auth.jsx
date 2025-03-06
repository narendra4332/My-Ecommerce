import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth, db } from "../Firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  // Handle Email/Password Auth
  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      let userCredential;
      if (isSignUp) {
        userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        // Default role as "user"
        await setDoc(doc(db, "users", userCredential.user.uid), {
          email: email,
          role: "user",
        });
      } else {
        userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
      }

      // Fetch user role after login
      const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));
      const userRole = userDoc.exists() ? userDoc.data().role : "user";

      // Redirect based on role
      navigate(userRole === "admin" ? "/admin" : "/");
    } catch (error) {
      alert(error.message);
    }
  };

  // Handle Google Sign-In
  const handleGoogleSignIn = async () => {
    try {
      const userCredential = await signInWithPopup(auth, provider);
      const userRef = doc(db, "users", userCredential.user.uid);
      const userDoc = await getDoc(userRef);

      // If new user, set default role
      if (!userDoc.exists()) {
        await setDoc(userRef, {
          email: userCredential.user.email,
          role: "user",
        });
      }

      const userRole = userDoc.exists() ? userDoc.data().role : "user";
      navigate(userRole === "admin" ? "/admin" : "/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="auth-container d-flex align-items-center justify-content-center vh-100">
      <div className="auth-card p-4 shadow-lg rounded">
        <h2 className="text-center text-light fw-bold">
          {isSignUp ? "Create Account" : "Welcome Back"}
        </h2>

        <form onSubmit={handleAuth}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 fw-bold">
            {isSignUp ? "Register" : "Login"}
          </button>
        </form>

        <div className="text-center my-3">
          <p className="text-light">OR</p>
          <button
            className="btn btn-light w-100 shadow-sm d-flex align-items-center justify-content-center"
            onClick={handleGoogleSignIn}
          >
            <FaGoogle className="me-2" /> Sign in with Google
          </button>
        </div>

        <p className="text-center text-light mt-3">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}
          <button
            className="btn btn-link text-decoration-none fw-bold"
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp ? "Login" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;
