import React, { useEffect } from 'react'
import { fetchProducts, fetchDealsOfDay, allProducts, dealsOfDayProducts } from '../../store/slices/productSlice'
import { useDispatch, useSelector } from 'react-redux'
import './HomeContainer.css'
import ProductCat from '../ProductCat/ProductCat'

export default function HomeContainers() {

  const dispatch = useDispatch();
  const products= useSelector(allProducts);
  const dodProducts = useSelector(dealsOfDayProducts)

  const under100Products= [...products].filter((item)=>{
    return item.product_price<=100;
  })

  const smartphones =[...products].filter((item)=>{
    return item.product_category==="smartphones"
  })

  const menFashionProducts = [...products].filter((item)=>{
    return item.product_category==="men-fashion"
  })
  

  useEffect(()=>{
    dispatch(fetchDealsOfDay());
    dispatch(fetchProducts());
  },[])
  return (
    <div className='home-container'>
      <ProductCat title={"Deals of the Day"} data={dodProducts}/>
      <ProductCat title={"Under ₹100"} data={under100Products.slice(0,4)}/>
      <ProductCat title={"Trending Smartphones"} data={smartphones.slice(0,4)}/>
      <ProductCat title={"Mens Fashion"} data={menFashionProducts.slice(0,4)}/>
    </div>
  )
}
