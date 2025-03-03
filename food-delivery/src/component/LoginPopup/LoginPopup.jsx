import React, { useState, useEffect } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/frontend_assets/assets";

const LoginPopup = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("Login");
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem("user", "true"); 
    window.location.reload();
  };

  const handleClose = () => {
    document.body.style.overflow = 'unset';
    setShowLogin(false);
  };

  return (
    <div className="login-popup">
      <form className="login-popup-container" onSubmit={handleLogin}>
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img 
            onClick={handleClose} 
            src={assets.cross_icon} 
            draggable={false} 
            alt="Close"
          />
        </div>
        <div className="login-popup-inputs">
          {currState === "Login" ? <></> : 
            <input type="text" placeholder="Your name" required />
          }
          <input type="email" placeholder="Your email" required />
          <input type="password" placeholder="Password" required />
        </div>
        <button type="submit">
          {currState === "Sign Up" ? "Create account" : "Login"}
        </button>

        <div 
          className="login-popup-condition" 
          onClick={() => setIsChecked(!isChecked)}
        >
          <input 
            type="checkbox" 
            checked={isChecked} 
            required 
            onChange={() => setIsChecked(!isChecked)} 
          />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>

        {currState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => setCurrState("Sign Up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrState("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;