import React from 'react'
import LoginPrompts from '../LoginPrompts'
import { useSelector } from 'react-redux'
import { getWishlistAll } from '../../store/slices/wishlistSlice'
import WishlistCard from './WishlistCard';
import './WishlistPage.css'

export default function WishlistPage() {

    const wishlist= useSelector(getWishlistAll);

    console.log()
  return (
    <>
  {localStorage.getItem('auth-token')?
    <div className='wishlist-page'>
      <h1>My Wishlist</h1>

      {!wishlist.length==0?     
        <div className="wishlist-list">
          {wishlist.map(item=> <WishlistCard key={item} item={item} />)}
        </div>
        :
        <div className="no-items-alert">
          No Items in WishList
        </div>
      }
    </div>

    :

    <LoginPrompts/>
  }

    </>
  )
}
