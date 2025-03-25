import React, { useState, useEffect } from "react";
import { FaGoogle } from "react-icons/fa";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, db } from "../../Firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [user, setUser] = useState(null); // ✅ User state track karne ke liye
  const [loading, setLoading] = useState(true); // ✅ Loading state add kiya
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  // ✅ Check Authentication State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userRole = userDoc.data().role;
          console.log("User Role:", userRole);

          // ✅ Sirf pehli baar login hone ke baad navigate karenge
          navigate("/");
        }
      }
      setLoading(false); // ✅ Loading complete
    });

    return () => unsubscribe(); // ✅ Cleanup function
  }, [navigate]);

  // ✅ Handle Email/Password Authentication
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

        // ✅ Default role "user" ke sath Firestore me store karein
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

      setUser(userCredential.user);
      navigate("/"); // ✅ Login hone ke baad navigate
    } catch (error) {
      alert(error.message);
    }
  };

  // ✅ Handle Google Sign-In
  const handleGoogleSignIn = async () => {
    try {
      const userCredential = await signInWithPopup(auth, provider);
      const userRef = doc(db, "users", userCredential.user.uid);
      const userDoc = await getDoc(userRef);

      // ✅ Agar pehli baar login ho raha hai to Firestore me data store karein
      if (!userDoc.exists()) {
        await setDoc(userRef, {
          email: userCredential.user.email,
          role: "user",
        });
      }

      setUser(userCredential.user);
      navigate("/"); // ✅ Google Login hone ke baad navigate
    } catch (error) {
      alert(error.message);
    }
  };

  if (loading) {
    return <div className="text-center text-light">Loading...</div>; // ✅ Jab tak auth state load ho raha hai, loading dikhao
  }

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
