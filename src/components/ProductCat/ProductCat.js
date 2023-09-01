import React from 'react'
import ProductCard from '../ProductCard/ProductCard'
import './ProductCat.css'

export default function ProductCat({title, data}) {
  return (
    <div className='product-cat'>
      <h2 className='product-cat-heading'>{title}</h2>

      <div className="products-list">
        {data.map((item)=>{
          return <ProductCard key={item._id} product={item} />
        })}
      </div>
    </div>
  )
}
