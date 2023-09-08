import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUser,currentUser, userStatus } from '../../store/slices/userSlice';
import { fetchUserCart, userCartItems } from '../../store/slices/cartSlice';
import LoginPrompts from '../LoginPrompts';
import './ProfilePage.css'
import { Link } from 'react-router-dom';

export default function ProfilePage() {

    const dispatch = useDispatch();
    const authToken = localStorage.getItem('auth-token');
    const user= useSelector(currentUser);

    
    useEffect(()=>{
      dispatch(getUser(authToken));
      dispatch(fetchUserCart(authToken));
    },[])

    

  return (

    <>
    {authToken?
      <div className='profile-page'>
        <div className="personal-header">
          <h3>Welcome {user.username}!</h3>
          <span>{user.email}</span>
        </div>

        <div className="profile-box">
          <Link to={'/'}>Continue Shopping!!</Link>
        </div>

        
      </div>
      :
      <LoginPrompts/>
    }
    </>
  )
}
