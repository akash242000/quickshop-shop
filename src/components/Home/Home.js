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

export default function Home() {

  const authToken=localStorage.getItem('auth-token');
  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<HomeContainers/>} />
        <Route path='/product/:id' element={<ProductPage/>} />
        <Route path='/products' element={<ProductList/>} />
        <Route path='/search/:query' element={<SearchProducts/>} />
        <Route path='/categories/:category' element={<CategoryList/>} />

        <Route path='/profile' element={<ProfilePage/>} />

        <Route path='/cart' element={<CartPage/>} />
        <Route path='/aaa' element={<MainSlider/>} />
      </Routes>
    </>
  )
}
