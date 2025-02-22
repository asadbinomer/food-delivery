import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { assets } from "../../assets/frontend_assets/assets";
import { Link } from "react-router-dom";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const [prevScrollPos, setPrevScrollPos] = useState(window.scrollY);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMenu("home");
  };

  return (
    <div className={`navbar ${visible ? "visible" : "hidden"}`}>
      <img src={assets.logo} alt="" className='logo' />
      <ul className="navbar-menu">
        <span onClick={scrollToTop}>
          <Link to="/" className={menu === "home" ? "active" : ""}>home</Link>
        </span>
        <a href='#explore-menu' className={menu === "menu" ? "active" : ""} onClick={() => setMenu("menu")}>menu</a>
        <a href='#app-download' className={menu === "mobile-app" ? "active" : ""} onClick={() => setMenu("mobile-app")}>mobile-app</a>
        <a href='#footer' className={menu === "contact-us" ? "active" : ""} onClick={() => setMenu("contact-us")}>contact us</a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
          <img src={assets.basket_icon} alt="" />
          <div className="dot"></div>
        </div>
        <button onClick={() => setShowLogin(true)}>sign in</button>
      </div>
    </div>
  );
};

export default Navbar;
