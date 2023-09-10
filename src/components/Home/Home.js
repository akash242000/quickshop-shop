import React from 'react'
import Navbar from '../Navbar/Navbar'
import {Route, Routes, useNavigate} from 'react-router-dom';
import HomeContainers from '../HomeContainer/HomeContainers';
import ProductPage from '../ProductPage/ProductPage';
import ProductList from '../ProductList/ProductList';
import SearchProducts from '../SearchProducts/SearchProducts';
import CategoryList from '../CategoryList';
import ProfilePage from '../Profile/ProfilePage';
import NotFound from '../NotFound';
import CartPage from '../CartPage/CartPage';
import WishlistPage from '../WishlistPage/WishlistPage';
import ProfilePopup from '../ProfilePopup/ProfilePopup';
import { useProfilePopupContext } from '../../contex/popupContex';
import Footer from '../Footer/Footer';
import { useDispatch } from 'react-redux';
import { fetchUser } from '../../store/slices/userSlice';
import { fetchUserCart } from '../../store/slices/cartSlice';
import { getWishlist } from '../../store/slices/wishlistSlice';

export default function Home() {

  const {profilePopup,showProfilePopup} = useProfilePopupContext()

  const navigate= useNavigate();
  const dispatch= useDispatch();

  
  if(localStorage.getItem('auth-token')){
    const authToken=localStorage.getItem('auth-token');
    dispatch(fetchUser(authToken));
    dispatch(fetchUserCart(authToken));
    dispatch(getWishlist(authToken))
  }
  return (
    <>
      <Navbar></Navbar>
      {profilePopup && <ProfilePopup/>}
      <Routes>
        <Route path='/' element={<HomeContainers/>} />
        <Route path='/product/:id' element={<ProductPage/>} />
        <Route path='/products' element={<ProductList/>} />
        <Route path='/search/:query' element={<SearchProducts/>} />
        <Route path='/categories/:category' element={<CategoryList/>} />

        <Route path='/profile' element={<ProfilePage/>} />
        <Route path='/wishlist' element={<WishlistPage/>} />
        <Route path='/cart' element={<CartPage/>} />

        <Route  exact path='*' element={<NotFound/>}/>
        <Route path='/logout' element={()=>{localStorage.removeItem('auth-token')
                                       navigate('/login')}} />
      </Routes>
      <Footer/>
    </>
  )
}
