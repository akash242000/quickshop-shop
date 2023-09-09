import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addProductReview } from '../../store/slices/productSlice';

export default function AddReview({authToken,productId}) {

    const [review, setReview] = useState('');
    const [rating, setRating] = useState(1);

    const userReview={
        productId:productId, 
        comment:review,
        rating:rating
    }


    const dispatch = useDispatch();

    function handleSubmit(){    
        
        dispatch(addProductReview({authToken,userReview}));
        setReview('')
        setRating(1)
    }

  return (
    <>
    {
        authToken?
        <div className='add-review-box'>
          <h4>Add your Review</h4>
          <div className="reiview-form">
            <div className="review-form-component">
              <label>Review</label> 
              <textarea name="" id="" className='' value={review} onChange={(event)=>setReview(event.target.value)} />
            </div>

            <div className="review-form-component">
              <label>Rating</label>
              <select onChange={(event)=>setRating(event.target.value)}>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </select>
            </div>

            <button className='btn' disabled={review.length<5 || review.length>100} onClick={handleSubmit} >Add</button>

          </div>
        </div>
        :
        <div>
          Login to Add Review
        </div>
    }
    </>
  )
}
