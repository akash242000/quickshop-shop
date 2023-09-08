import React from 'react'
import Navbar from '../Navbar/Navbar'
import {Route, Routes} from 'react-router-dom';
import HomeContainers from '../HomeContainer/HomeContainers';
import ProductPage from '../ProductPage/ProductPage';
import ProductList from '../ProductList/ProductList';
import SearchProducts from '../SearchProducts/SearchProducts';
import CategoryList from '../CategoryList';
import ProfilePage from '../Profile/ProfilePage';
import MainSlider from '../MainSlider';
import CartPage from '../CartPage/CartPage';
import WishlistPage from '../WishlistPage/WishlistPage';
import ProfilePopup from '../ProfilePopup/ProfilePopup';
import { useProfilePopupContext } from '../../contex/popupContex';
import CarouselHome from '../CarouselHome/CarouselHome';

export default function Home() {

  const {profilePopup,showProfilePopup} = useProfilePopupContext()


  const authToken=localStorage.getItem('auth-token');
  return (
    <>
      <Navbar></Navbar>
      {profilePopup && <ProfilePopup/>}
      <CarouselHome/>
      <Routes>
        <Route path='/' element={<HomeContainers/>} />
        <Route path='/product/:id' element={<ProductPage/>} />
        <Route path='/products' element={<ProductList/>} />
        <Route path='/search/:query' element={<SearchProducts/>} />
        <Route path='/categories/:category' element={<CategoryList/>} />

        <Route path='/profile' element={<ProfilePage/>} />
        <Route path='/wishlist' element={<WishlistPage/>} />
        <Route path='/cart' element={<CartPage/>} />
        <Route path='/aaa' element={<MainSlider/>} />
      </Routes>
    </>
  )
}
