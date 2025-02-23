import React from 'react'
import { assets } from "../../assets/frontend_assets/assets"
import "./AppDownload.css"

const AppDownload = () => {
  return (
    <>
      <div className="app-download" id='app-download'>
         <p>For Better Experience Download <br /> Tomato App</p>
         <div className="app-download-platforms">
            <a href="https://play.google.com/" target='_blank'><img src={assets.play_store} draggable={false} alt="" /></a>
            <a href="https://www.apple.com/" target='_blank'><img src={assets.app_store} draggable={false} alt="" /></a>
         </div>
      </div>
    </>
  )
}

export default AppDownload