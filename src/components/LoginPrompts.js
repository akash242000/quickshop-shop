import React from 'react'
import { Link } from 'react-router-dom';

export default function LoginPrompts() {
  return (
    <div className="login-to-buy">
    <h2>Join QuickShop to Shop</h2>

    <div>
      <Link to={'/login'}> <button className='btn'>Login</button> </Link>
      or
      <Link to={'/register'}> <button className='btn'>Sign Up</button> </Link>
    </div>

  </div>
  )
}
