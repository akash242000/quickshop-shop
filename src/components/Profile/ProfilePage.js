import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUser,currentUser, userStatus } from '../../store/slices/userSlice';
import { fetchUserCart, userCartItems } from '../../store/slices/cartSlice';
import LoginPrompts from '../LoginPrompts';

export default function ProfilePage() {

    const dispatch = useDispatch();
    const authToken = localStorage.getItem('auth-token');
    const status= useSelector(userStatus);
    const user= useSelector(currentUser);

    const cartItems= useSelector(userCartItems)
    
    
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

        <div className="profile-cartItems">
          {
            status==='fullfilled'?
            user.cartItems.length===0?
            <div className="profile-msg">
              No Cart Items, Add Something to Cart!
            </div>
            :
            <>
            {cartItems.map((item)=>{
              return <h1 key={item.id}>{item.product_name}</h1>
            })}
            </>
            :
            <></>
            
          }

        </div>

        
      </div>
      :
      <LoginPrompts/>
    }
    </>
  )
}
