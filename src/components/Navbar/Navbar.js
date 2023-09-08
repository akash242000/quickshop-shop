import React, { useEffect, useRef, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './Navbar.css'
import { useNavigate, Link } from 'react-router-dom';
import { useProfilePopupContext } from '../../contex/popupContex';
import { useSelector } from 'react-redux';
import { getCartItemCount } from '../../store/slices/cartSlice';
import CategoriesNav from './CategoriesNav';


export default function Navbar() {
    
    const searchRef = useRef();
    const navigate= useNavigate();
    
    const cartCount = useSelector(getCartItemCount);

    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    
    useEffect(()=>{
        function handleResize(){    
            setScreenWidth(window.innerWidth);
        }
        window.addEventListener('resize', handleResize);
        return ()=>{
            window.removeEventListener('resize', handleResize)
        }
    },[screenWidth]);

    

    const {showProfilePopup} = useProfilePopupContext();

    
    function handleClick(){
        navigate(`/search/${searchRef.current.value}`)
    }

  return (
    <div className='navbar-wrapper'>
        <div className="nav-right">
            <Link to={'/'}>
                <div className="main-logo main-logo-desk"> QuickShop</div>
                <div className="main-logo main-logo-mob"> Q</div>
            </Link>
            {/* <div className="nav-main-categories">
                <Link className='nav-cat-items' to={'/categories/smartphones'}>
                    <span className='nav-cat-item-name'>Mobiles</span>
                </Link>

                <Link className='nav-cat-items' to={'/categories/men-fashion'}>
                    <span className='nav-cat-item-name'>{screenWidth>1150?"Mens Fashion":"Men"}</span>
                </Link>

                <Link className='nav-cat-items' to={'/categories/women-fashion'}>
                    <span className='nav-cat-item-name'>{screenWidth>1150?"Womens Fashion":"Women"}</span>
                </Link>

                <Link className='nav-cat-items' to={'/categories/beauty'}>
                    <span className='nav-cat-item-name'>Beauty</span>
                </Link>

                <Link className='nav-cat-items' to={'/products'}>
                    <span className='nav-cat-item-name'>{screenWidth>1150?"All Products":"All"}</span>
                </Link>
                
            </div> */}
            <CategoriesNav screenWidth={screenWidth} />
        </div>

        <div className="nav-left">
            <div className="search-bar">
                <input type="text" className='input-box' placeholder='Search' ref={searchRef} />
                
                <SearchIcon onClick={handleClick} />
            </div>

            <div className="nav-account-info-container">
                <span className='nav-acc-items nav-acc-item-wishlist' onClick={()=>{navigate('/wishlist')}} ><FavoriteIcon/></span>
                <span className='nav-acc-items' onClick={()=>{navigate('/cart')}} >
                    <ShoppingCartIcon/>
                    <span className='cart-items-count'>{cartCount>9?'9+':cartCount}</span>
                </span>
                <span className='nav-acc-items' onClick={()=>{showProfilePopup()}}><AccountCircleIcon/></span>
            </div>
        </div>
      
    </div>
  )
}
