import React from 'react'
import './ProductCard.css'
import {toRuppe} from '../../utils/currencyFormat'
import { Link } from 'react-router-dom'

export default function ProductCard({product}) {
  return (
   

        <Link className='product-link' to={`/product/${product.product_id}`}>
            <div className='product-card'>
              <img src={product.photos[0]} alt="" />

              <div className="product-info-wrapper">
                  <h5>{product.product_name}</h5>
                  <h3>{toRuppe.format(product.product_price)}</h3>
              </div>

            </div>
        </Link>
  )
}
