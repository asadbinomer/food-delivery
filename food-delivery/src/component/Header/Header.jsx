import React from 'react'
import "./Header.css"
import { motion } from "framer-motion"

const Header = () => {
  return (
    <>
      <div className="header" id='header'>
        <div className="header-content">
          <h2>Order Your favourite food here</h2>
          <p>Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.</p>
          <motion.button whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.93 }}>View Menu</motion.button>
        </div>
      </div>
    </>
  )
}

export default Header 