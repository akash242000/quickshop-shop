import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getProductbyId } from '../../store/slices/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import ProductImagesGrid from './ProductImagesGrid';
import { toRuppe } from '../../utils/currencyFormat';
import './ProductPage.css'
import RatingStars from '../RatingStars/RatingStars';
import ratingAverage from '../../utils/ratingAverage';
import discount from '../../utils/discountCalc';
import { addCartItem, cartItemAddedStatus, checkInCart } from '../../store/slices/cartSlice';

export default function ProductPage() {

  const params = useParams();
  const productId = params.id;
  
  let product = useSelector((state)=>getProductbyId(state,productId));

  let cartStatus="Add to Cart";
  const isPresentInCart=useSelector(state=>checkInCart(state,productId));
  
  const [PresentInCart, setPresentInCart] = useState('Add to Cart')

  
  useEffect(()=>{
    setPresentInCart(isPresentInCart);
  },[handleAddtoCart])
  

  const dispatch = useDispatch();
  
  const [activePhoto, setActivePhoto] = useState(product.photos[0])
  
  
  const authToken = localStorage.getItem('auth-token');
  
  function changeProductPhoto(image){
    setActivePhoto(image)
  }
  
  async function handleAddtoCart(){
    dispatch(addCartItem({authToken,productId})).unwrap()
    .then((res)=> cartStatus="Added")
    .catch(error=>cartStatus="Added")

  }
  

  return (
    <div className='product-page'>
      <div className="product-header-section">
        <div className="product-pictures-box">
                <ProductImagesGrid images={product.photos} changePhoto={(image)=>{changeProductPhoto(image)}} />
            <div className="main-photo">
              <img src={activePhoto} alt="" />
            </div>
        </div>

        <div className="product-main-box">
            <div className="product-info-header">
              <h2>{product.product_name}</h2>
              <Link>{product.product_brand}</Link>
            </div>

            <div className="rating-box">

                <RatingStars ratings={ratingAverage(product.product_reviews)} showRating />
                      |
                <div className="rating-info">
                  {product.product_reviews.length} Ratings
                </div>

              </div>

            <div className="price-section">
              <div className="price-box">
                <h2>{toRuppe.format(product.product_price)}</h2>
                <span className='discount-box'>{`-${discount(product.product_price, product.mrp)}%`}</span>
              </div>

              <div >MRP: <span className="mrp">{product.mrp}</span></div>
            </div>

            <div className="buy-section">
              {authToken ? 
                <>
                  <button className='btn btn-normal' disabled={isPresentInCart} onClick={handleAddtoCart} >{isPresentInCart?'Added!':cartStatus}</button>
                  <div className="wishlist-box">
                    <i className="fa-regular fa-heart wishlist"></i>
                    <p>Wishlist</p>
                  </div>
                </>
                :
                <Link to={'/login'}>
                 <button className='btn btn-normal' >Login to Buy</button>
                </Link>
              }
              
            </div>

        </div>
      </div>
    </div>
  )
}
