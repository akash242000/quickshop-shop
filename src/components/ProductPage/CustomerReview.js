import React, { useEffect, useState } from 'react'
import RatingStars from '../RatingStars/RatingStars'
import './ProductPage.css'
import { useDispatch } from 'react-redux'
import { getUserById, userStatus } from '../../store/slices/userSlice';

export default function CustomerReview({review}) {

  const dispatch = useDispatch();

  const [userName, setUserName] = useState('')

  let URL="http://localhost:5000/auth/getUserById"

  const [loading, isLoading] = useState(false);

  async function getUser(){
    isLoading(true)
    try {
      let user=await fetch(`${URL}/${review.user_id}`, {method:'POST'});
      let userData= await user.json();
      isLoading(false);

      if(!user.ok){
        throw new Error("No User Found")
      }

      return setUserName(userData);
    } catch (error) {
      isLoading(false);
      return setUserName('User')
    }


  }

  useEffect(()=>{
    
    getUser();

    
  },[review.user_id])



  return (
    <>
    {!loading?

      <div className='customer-review-card'>
          <div className="c-r-card-header">
                <h5 className='review-cust-name'>{userName}</h5>
              <RatingStars ratings={review.rating} />
          </div>

        <p>{review.comment}</p>
      </div>
      :
      <div className="customer-review-card">
        Loading...
      </div>
    } 
    </> 
  )
}
