import React, { useState, useEffect, useContext } from 'react';
import './Navbar.css';
import { assets } from "../../assets/frontend_assets/assets";
import { Link } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const [prevScrollPos, setPrevScrollPos] = useState(window.scrollY);
  const [visible, setVisible] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false); 
  const { getTotalCartAmount } = useContext(StoreContext);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user === "true") {
      setIsSignedIn(true);
    }
  }, []);

  

  const handleSignInClick = () => {
    setShowLogin(true);
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      localStorage.removeItem("user"); 
      setIsSignedIn(false);
    }
  };
  

  return (
    <div className={`navbar ${visible ? "visible" : "hidden"}`}>
      <Link to="/"><img src={assets.logo} alt="" className='logo' /></Link>
      <ul className="navbar-menu">
        <span onClick={() => setMenu("home")}>
          <Link to="/" className={menu === "home" ? "active" : ""}>home</Link>
        </span>
        <a href='#explore-menu' className={menu === "menu" ? "active" : ""} onClick={() => setMenu("menu")}>menu</a>
        <a href='#app-download' className={menu === "mobile-app" ? "active" : ""} onClick={() => setMenu("mobile-app")}>mobile-app</a>
        <a href='#footer' className={menu === "contact-us" ? "active" : ""} onClick={() => setMenu("contact-us")}>contact us</a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="Search" />
        <div className="navbar-search-icon">
          <Link to="/cart"><img src={assets.basket_icon} alt="Cart" /></Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>

        {isSignedIn ? (
          <img 
            src="/profile_icon.png"  
            alt="User" 
            className="user-icon"
            onClick={handleLogout}
          />
        ) : (
          <button onClick={handleSignInClick}>Sign In</button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
