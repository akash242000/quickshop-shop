import React from 'react'
import '../ProductPage/ProductPage.css'

export default function RatingStars({ratings, showRating}) {
  return (
    <div className="rating-indicator">
        {showRating && <span className='rating-number'>{Math.round(ratings)}</span>}
        <span className='rating-stars'>
        {Array.from({length:5}).map((star, index)=>{
            return <span key={index} className={`${(index)<Math.round(ratings)? 'fa-solid checked-star' :'fa-solid unchecked-star' } fa-star`}></span>
        })}
        </span>
    </div>
  )
}
