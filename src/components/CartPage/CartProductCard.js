import React, { useEffect, useState } from 'react'
import { toRuppe } from '../../utils/currencyFormat';
import { getProductbyId, productStatus } from '../../store/slices/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { changeProductQuantity, deleteCartItem } from '../../store/slices/cartSlice';
import './CartPage.css'

export default function CartProductCard({product}) {

    const dispatch =useDispatch();
    const authToken= localStorage.getItem('auth-token');

    const productLoading = useSelector(productStatus)

    const item = useSelector((state)=> getProductbyId(state, product.productId))
    
    const [quantity, setQuantity] = useState(product.quantity);
    
    const productId= product.productId

    function changeQuantity(event){
      setQuantity(event.target.value);
    }

    function deleteItem(){
      dispatch(deleteCartItem({authToken,productId}))
    }


    useEffect(()=>{
      dispatch(changeProductQuantity({authToken,productId,quantity}))
    },[quantity])
    

  return (
    <>
    {productLoading==="fullfilled"?
      <div className='cart-product-cart'>
        <div className="cart-product-img">
          <img src={item.photos[0]} alt="" />
        </div>
        <div className="cart-product-box">
          <h4 className='cart-pd-heading'>{item.product_name}</h4>
          <p className='cart-product-price'>{toRuppe.format(item.product_price)}</p>
          <div className="cart-pd-toolbar">
            <div className="select-box">
              <select className='cart-units-input' name="productQuantity" onChange={changeQuantity} defaultValue={quantity} id="">
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </select>
              <label>Units</label>
            </div>
              <button  onClick={deleteItem} className='btn-small btn'>Remove</button>
          </div>
        </div>
      </div>
      :
      <>
      Loading..
      </>
      }
    </>
  )
}
