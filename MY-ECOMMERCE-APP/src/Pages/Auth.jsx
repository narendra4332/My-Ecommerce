import React, { useState } from "react";
import { FaSignInAlt } from "react-icons/fa";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../Firebase";
import { useNavigate } from "react-router-dom";

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
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      navigate("/"); // Redirect to Home
    } catch (error) {
      alert(error.message);
    }
  };

  // Handle Google Sign-In
  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate("/"); // Redirect to Home
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card shadow-lg p-4 rounded" style={{ width: "350px" }}>
        <h2 className="text-center text-primary">
          {isSignUp ? "Create an Account" : "Welcome Back"}
        </h2>
        <p className="text-center text-muted">
          {isSignUp ? "Sign up to get started!" : "Sign in to continue"}
        </p>

        <form onSubmit={handleAuth}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
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
          <button type="submit" className="btn btn-primary w-100">
            {isSignUp ? "Register" : "Login"}
          </button>
        </form>

        <div className="text-center my-3">
          <p className="text-muted">or</p>
          <button
            className="btn btn-outline-danger w-100"
            onClick={handleGoogleSignIn}
          >
            <i className="fab fa-google me-2"></i> Sign in with Google {}
            <FaSignInAlt />
          </button>
        </div>

        <p className="text-center mt-3">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}
          <button
            className="btn btn-link text-decoration-none text-primary"
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;
