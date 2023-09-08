import React from 'react'
import { Link } from 'react-router-dom'

export default function CategoriesNav({homeNav,screenWidth}) {
  return (
    <div className={`nav-main-categories ${homeNav?'nav-main-home-top':''}`}>
    <Link className='nav-cat-items' to={'/categories/smartphones'}>
        <span className='nav-cat-item-name'>Mobiles</span>
    </Link>

    <Link className='nav-cat-items' to={'/categories/men-fashion'}>
        <span className='nav-cat-item-name'>{screenWidth>1150?"Mens Fashion":"Men"}</span>
    </Link>

    <Link className='nav-cat-items' to={'/categories/women-fashion'}>
        <span className='nav-cat-item-name'>{screenWidth>1150?"Womens Fashion":"Women"}</span>
    </Link>

    <Link className='nav-cat-items' to={'/categories/beauty'}>
        <span className='nav-cat-item-name'>Beauty</span>
    </Link>

    <Link className='nav-cat-items' to={'/products'}>
        <span className='nav-cat-item-name'>{screenWidth>1150?"All Products":"All"}</span>
    </Link>
    
</div>
  )
}
