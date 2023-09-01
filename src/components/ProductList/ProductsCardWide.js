import React from 'react'
import { toRuppe } from '../../utils/currencyFormat';
import RatingStars from '../RatingStars/RatingStars';
import { Link } from 'react-router-dom';
import './ProductList.css';
import ratingAverage from '../../utils/ratingAverage';
import discount from '../../utils/discountCalc';

export default function ProductsCardWide({product}) {

  // let ratings= product.product_reviews.reduce((acc,curr)=>{
  //   return acc+curr.rating;
  // },0);

  // ratings=ratings/product.product_reviews.length;

  // const discount = Math.round(((product.mrp-product.product_price)/product.mrp)*100)

  return (
    <Link to={`/product/${product.product_id}`}>
      <div className='search-product-card'>
          <img src={product.photos[0]} alt="" />
          <div className="search-product-footer">
            <h4>{product.product_name}</h4>

            <RatingStars ratings={ratingAverage(product.product_reviews)} showRating/>

          </div>

          <div className="search-product-price-box">
            <h4>{toRuppe.format(product.product_price)}</h4>
            <span>MRP:{toRuppe.format(product.mrp)}</span>
            <span>-{discount(product.product_price ,product.mrp)}%</span>
          </div>
      </div>
    </Link>
  )
}
