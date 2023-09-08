import React from 'react'
import LoginPrompts from '../LoginPrompts'
import { useSelector } from 'react-redux'
import { getWishlistAll } from '../../store/slices/wishlistSlice'
import WishlistCard from './WishlistCard';
import './WishlistPage.css'

export default function WishlistPage() {

    const wishlist= useSelector(getWishlistAll);
  return (
    <>
  {localStorage.getItem('auth-token')?
    <div className='wishlist-page'>
      <h1>My Wishlist</h1>

      <div className="wishlist-list">
        {wishlist.map(item=> <WishlistCard key={item} item={item} />)}
      </div>
    </div>

    :

    <LoginPrompts/>
  }

    </>
  )
}
