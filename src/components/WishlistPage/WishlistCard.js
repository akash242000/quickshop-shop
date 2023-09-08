import React from 'react'
import { useSelector } from 'react-redux'
import { getProductbyId } from '../../store/slices/productSlice'
import './WishlistPage.css'
import { Link } from 'react-router-dom'

export default function WishlistCard({item}) {

    const product = useSelector((state)=>getProductbyId(state, item))

  return (
    <Link to={`/product/${product.product_id}`}>
        <div className='wishlist-card'>
        <img src={product.photos[0]}/>
        <h3 className='wishlist-h3'>{product.product_name}</h3>
        </div>
    </Link>
  )
}
