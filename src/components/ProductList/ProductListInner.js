import React from 'react'
import './ProductList.css';
import ProductsCardWide from './ProductsCardWide';

export default function ProductListInner({products, loading}) {
  return (
  //   <div className="search-products-list">
  //   {products.length===0?
      
  //     <div className="message-screen">
  //       No Products Found
  //     </div>
  //     :
  //     products.map((product)=>{
  //       return <ProductsCardWide key={product.product_name} product={product} />
  //     }
    
  //   )}
  // </div>

<div className="search-products-list">

  {
    loading!=='fullfilled'?
    <div className="loading">
      <img src="/loading.gif" alt="" />
    </div>
    :
    <>
      {products.length===0?
      
    
           <div className="message-screen">
                No Products Found
            </div>

            :
            products.map((product)=>{
              return <ProductsCardWide key={product.product_name} product={product} />
            }
          
            )
      }
      </>
    }
    
</div>
  )
}
