import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { assets } from "../../assets/frontend_assets/assets";
import { StoreContext } from "../../context/StoreContext";
import "./Navbar.css"

const Navbar = ({ setShowLogin }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { getTotalCartAmount } = useContext(StoreContext);

  const [menu, setMenu] = useState("home");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(window.scrollY);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsSignedIn(user === "true");
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  const handleScrollToSection = (id, menuName) => {
    setMenu(menuName);
    if (location.pathname !== "/") {
      navigate(`/#${id}`);
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 500);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      localStorage.removeItem("user");
      setIsSignedIn(false);
    }
  };

  // Check if we're on the cart page
  const isCartPage = location.pathname === "/cart";
  const isorderPage = location.pathname === "/order";

  return (
    <div className={`navbar ${visible ? "visible" : "hidden"} ${isCartPage, isorderPage ? 'cart-page' : ''}`}>
      <Link to="/">
        <img src={assets.logo} alt="Logo" className="logo" />
      </Link>
      <ul className="navbar-menu">
        <li className="menu-item">
          <span 
            onClick={() => { 
              setMenu("home"); 
              navigate("/"); 
              window.scrollTo(0, 0); 
            }}
            className={menu === "home" && !isCartPage && !isorderPage ? "active" : ""}
          >
            home
          </span>
        </li>
        <li className="menu-item">
          <span 
            onClick={() => handleScrollToSection("explore-menu", "menu")}
            className={menu === "menu" && !isCartPage && !isorderPage ? "active" : ""}
          >
            menu
          </span>
        </li>
        <li className="menu-item">
          <span 
            onClick={() => handleScrollToSection("app-download", "mobile-app")}
            className={menu === "mobile-app" && !isCartPage && !isorderPage ? "active" : ""}
          >
            mobile-app
          </span>
        </li>
        <li className="menu-item">
          <span 
            onClick={() => handleScrollToSection("footer", "contact-us")}
            className={menu === "contact-us" && !isCartPage && !isorderPage ? "active" : ""}
          >
            contact us
          </span>
        </li>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="Search" className="search" />
        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="Cart" />
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        {isSignedIn ? (
          <img src="/profile_icon.png" alt="User" className="user-icon" onClick={handleLogout} />
        ) : (
          <button onClick={() => setShowLogin(true)}>Sign In</button>
        )}
      </div>
    </div>
  );
};

export default Navbar;