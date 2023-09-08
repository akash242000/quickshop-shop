import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <div className='footer'>
      <div className="ft-left-sec">
      <div className="main-logo"> QuickShop</div>
      </div>
      <div className="ft-right-sec">
        <Link>Contact Us</Link>
        <Link>About QuickShop</Link>
        <Link>Privacy Policy</Link>
        <Link>Terms and Conditions</Link>
      </div>
    </div>
  )
}
