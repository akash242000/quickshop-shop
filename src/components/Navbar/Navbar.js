import React, { useRef } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './Navbar.css'
import { useNavigate, Link } from 'react-router-dom';


export default function Navbar() {
    
    const searchRef = useRef();
    const navigate= useNavigate()

    
    function handleClick(){
        navigate(`/search/${searchRef.current.value}`)
    }

  return (
    <div className='navbar-wrapper'>
        <div className="nav-right">
            <Link to={'/'}>
                <div className="main-logo"> QuickShop</div>
            </Link>
            <div className="nav-main-categories">
                <Link className='nav-cat-items' to={'/categories/smartphones'}>
                    <span className='nav-cat-item-name'>Mobiles</span>
                </Link>

                <Link className='nav-cat-items' to={'/categories/men-fashion'}>
                    <span className='nav-cat-item-name'>Men Fashion</span>
                </Link>

                <Link className='nav-cat-items' to={'/categories/women-fashion'}>
                    <span className='nav-cat-item-name'>Women Fashion</span>
                </Link>

                <Link className='nav-cat-items' to={'/categories/beauty'}>
                    <span className='nav-cat-item-name'>Beauty</span>
                </Link>

                <Link className='nav-cat-items' to={'/products'}>
                    <span className='nav-cat-item-name'>All Products</span>
                </Link>
                
            </div>
        </div>

        <div className="nav-left">
            <div className="search-bar">
                <input type="text" className='input-box' placeholder='Search' ref={searchRef} />
                
                <SearchIcon onClick={handleClick} />
            </div>

            <div className="nav-account-info-container">
                <span className='nav-acc-items' ><FavoriteIcon/></span>
                <span className='nav-acc-items' onClick={()=>{navigate('/cart')}} ><ShoppingCartIcon/></span>
                <span className='nav-acc-items' onClick={()=>{navigate('/profile')}}><AccountCircleIcon/></span>
            </div>
        </div>
      
    </div>
  )
}
