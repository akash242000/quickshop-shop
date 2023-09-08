import React, { useEffect } from 'react'
import './CartPage.css'
import { fetchUserCart, userCartItems } from '../../store/slices/cartSlice'
import { useDispatch, useSelector } from 'react-redux'
import CartProductCard from './CartProductCard';
import { toRuppe } from '../../utils/currencyFormat';

import { getProductPrice } from '../../store/slices/productSlice';
import LoginPrompts from '../LoginPrompts';

export default function CartPage() {

    const dispatch =useDispatch();

    const authToken= localStorage.getItem('auth-token');
    const cart= useSelector(userCartItems);

    let cartTotal = cart.reduce((acc, curr)=>{
        return acc + (curr.quantity* curr.price)
    },0)




  return (
    <>
    {authToken?
      <>
        {!cart.length==0?
          <div className='cartpage'>
          <div className="header">
            <h3>My Cart</h3>
            <span className="price-total-box"></span>
          </div>  

        <section className='cart-page-main'>
          <div className="cart-items-list">
              {cart.map((item)=>{
                  return <CartProductCard key={item.product_id} product={item}/>
              })}
          </div>

          <div className="cart-page-total-box">
            <h3>Total:</h3>
            <h2 className='total-heading' >{toRuppe.format(cartTotal)}</h2>
          </div>
        </section>
          </div>
          :
          <div className="no-item-alert-wrapper">
            <div className="no-items-alert">
              No Items in Cart
            </div>
          </div>
        }
      </>  
      :
      <LoginPrompts/>
    }
    </>
  )
}
