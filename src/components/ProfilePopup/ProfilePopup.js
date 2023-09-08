import React from 'react'
import { Link } from 'react-router-dom';
import './ProfilePopup.css'
import { useProfilePopupContext } from '../../contex/popupContex';

export default function ProfilePopup() {

    const authToken= localStorage.getItem('auth-token');
    const {profilePopup,turnProfilePopup} = useProfilePopupContext();



    // document.addEventListener('DOMContentLoaded', ()=>{
    //     console.log("done")
    //     let popupBg =  document.querySelector('.profile-popup-bg');
    //     popupBg.addEventListener('click',()=>{
    //         console.log("clicked")
    //     })
    // })

    function handleClick(e){
        if(e.target.className==="profile-popup-bg"){
            turnProfilePopup();
        }
    }

    function handlePopup(e){
        if(e.target.className==="profile-p-popup-link"){
            turnProfilePopup();
        }
    }



  return (
    <div className='profile-popup-bg' onClick={handleClick}>
        {
            authToken?
            <div className="profile-popup" onClick={handlePopup}>

                <span className="profile-p-popup">
                    <Link to={'/profile'} className='profile-p-popup-link' >My Account</Link>
                </span>
        
                <span className="profile-p-popup">
                    <Link to={'/cart'} className='profile-p-popup-link' >Cart</Link>
                </span>
        
                <span className="profile-p-popup">
                    <Link to={'/wishlist'} className='profile-p-popup-link' >WishList</Link>
                </span>

                
                <span className="profile-p-popup">
                    <Link to={'/about'} className='profile-p-popup-link' >About Us</Link>
                </span>
        
                <span className="profile-p-popup">
                    <Link to={'/logout'} className='profile-p-popup-link' >Logout</Link>
                </span>

    
            </div>
            :
            <div className="profile-popup">
    
                <span className="profile-p-popup">
                    <Link to={'/about'} className='profile-p-popup-link' >About Us</Link>
                </span>
        
                <span className="profile-p-popup">
                    <Link to={'/login'} className='profile-p-popup-link' >Login</Link>
                </span>

                <span className="profile-p-popup">
                    <Link to={'/register'} className='profile-p-popup-link' >Create Account</Link>
                </span>
    
            </div>
        }

    </div>
  )
}
