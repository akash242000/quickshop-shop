import React, { useEffect, useState } from 'react'
import { allProducts, fetchProducts, productsLoading } from '../../store/slices/productSlice'
import { useDispatch, useSelector } from 'react-redux'
import './ProductList.css'
import RatingStars from '../RatingStars/RatingStars';
import ProductListInner from './ProductListInner';
import ratingAverage from '../../utils/ratingAverage';
import discount from '../../utils/discountCalc';


export default function ProductList({ filter,category }) {

    const dispatch= useDispatch();

    let getProducts= useSelector(allProducts);
    let products;

    useEffect(()=>{
      revertSort();
      console.log("Catergory Changed")
    },[filter,category])
    let prodcutsLoading=useSelector(productsLoading);


    const [priceSort, setPriceSort] = useState([0,1000000]);
    const [ratingSort, setRatingSort] = useState(6);
    const [discountSort, setDiscountSort] = useState(0);
    
    console.log(discountSort)

    function updateProducts(getProducts){
      if(filter){
        return [...getProducts].filter((item)=>item.product_name.toLowerCase().includes(filter.toLowerCase()));
      }else if(category){
        return [...getProducts].filter((item)=>item.product_category===category)
      }
      else{
        return getProducts;
      }
   }

   function revertSort(){
      setPriceSort([0,1000000]);
      setRatingSort(6);
      setDiscountSort(0);
   }

    
    useEffect(()=>{
      dispatch(fetchProducts());
    },[])
    
    
    const [filteredProducts, setFilteredProducts] = useState([]);


    useEffect(()=>{

      products=updateProducts(getProducts);
      let newFilteredProducts=products.filter((product)=>{ 
        if((priceSort[0]<=parseInt(product.product_price) && priceSort[1]>=parseInt(product.product_price)) && 
          ( ratingSort!==6 ? (parseInt(ratingSort)===(ratingAverage(product.product_reviews))) : true) &&
          (parseInt(discountSort)<discount(product.product_price, product.mrp))
        ){
          return true;
        }
        return false
     }
  )
      setFilteredProducts(newFilteredProducts);
      
    },[priceSort,ratingSort,discountSort, filter, category]);

    



  return (
    <div className='products-list-container'>
      
      <div className="sorting-box">

        {/****** Price *******/}
        <h4 className="sort-box-heading">Price:</h4>
        <div className="price-sort-box sort-box">
          <div className="sort-options">
            <input type="radio" name="price-sort"  
                                value="[0,100]" 
                                className='checkbox' 
                                onChange={(event)=>{setPriceSort(JSON.parse(event.target.value))}} 
                                checked={JSON.stringify(priceSort)==="[0,100]"}
                                />
            <label>Under ₹100</label>
          </div>

          <div className="sort-options">
            <input type="radio" name="price-sort"  
                                value="[100,300]" 
                                className='checkbox' 
                                onChange={(event)=>{setPriceSort(JSON.parse(event.target.value))}} 
                                checked={JSON.stringify(priceSort)==="[100,300]"}
                                />
            <label>₹100-₹300</label>
          </div>

          <div className="sort-options">
            <input type="radio" name="price-sort"  
                                value="[300,1000]" 
                                className='checkbox' 
                                onChange={(event)=>{setPriceSort(JSON.parse(event.target.value))}} 
                                checked={JSON.stringify(priceSort)==="[300,1000]"}
                                />
            <label>₹300-₹1000</label>
          </div>

          <div className="sort-options">
            <input type="radio" name="price-sort"  
                                value="[1000,100000]" 
                                className='checkbox' 
                                onChange={(event)=>{setPriceSort(JSON.parse(event.target.value))}} 
                                checked={JSON.stringify(priceSort)==="[1000,100000]"}
                                />
            <label>Over ₹1000</label>
          </div>

          {/* <div className="sort-options">
            <input type="radio" name="price-sort"  
                                value="[0,100000000]" 
                                className='checkbox' 
                                onChange={(event)=>{setPriceSort(JSON.parse(event.target.value))}} 
                                checked
                                />
            <label>All</label>
          </div> */}
        </div>


        {/****** Ratings *******/}
        <h4 className="sort-box-heading">Ratings:</h4>
        <div className="rating-sort-box sort-box">
          <div className="sort-options">
            <input type="radio" 
                   name="rating-sort"  
                   value={5} 
                   className='checkbox' 
                   onChange={(event)=>{setRatingSort(event.target.value)}} 
                   checked={ratingSort==="5"}
                                />
            <RatingStars ratings={5}/>
          </div>

          <div className="sort-options">
            <input type="radio" 
                   name="rating-sort"  
                   value={4} 
                   className='checkbox' 
                   onChange={(event)=>{setRatingSort(event.target.value)}} 
                   checked={ratingSort==="4"}
                                />
            <RatingStars ratings={4}/>
          </div>

          <div className="sort-options">
            <input type="radio" 
                   name="rating-sort"  
                   value={3} 
                   className='checkbox' 
                   onChange={(event)=>{setRatingSort(event.target.value)}} 
                   checked={ratingSort==="3"}
                  />
            <RatingStars ratings={3}/>
          </div>

          <div className="sort-options">
            <input type="radio" 
                   name="rating-sort"  
                   value={2} 
                   className='checkbox' 
                   onChange={(event)=>{setRatingSort(event.target.value)}} 
                   checked={ratingSort==="2"}
                                />
            <RatingStars ratings={2}/>
          </div>

          <div className="sort-options">
            <input type="radio" 
                   name="rating-sort" 
                   value={1} 
                   className='checkbox'
                   onChange={(event)=>{setRatingSort(event.target.value)}}  
                   checked={ratingSort==="1"}
                   />
            <RatingStars ratings={1}/>
          </div>
        </div>

        {/****** Discount *******/}
        <h4 className="sort-box-heading">Discount:</h4>
        <div className="discount-sort-box sort-box">

          <div className="sort-options">
            <input type="radio" 
                   name="discount-sort"  
                   value={10} className='checkbox' 
                   onChange={(event)=>{setDiscountSort(event.target.value)}} 
                   checked={discountSort==='10'}
            />
            <label>10% Off and more</label>
          </div>

          <div className="sort-options">
            <input type="radio" 
                   name="discount-sort"  
                   value={20} className='checkbox' 
                   onChange={(event)=>{setDiscountSort(event.target.value)}} 
                   checked={discountSort==='20'}
                   />
            <label>20% Off and more</label>
          </div>

          <div className="sort-options">
            <input type="radio" 
                   name="discount-sort"  
                   value={40} className='checkbox' 
                   onChange={(event)=>{setDiscountSort(event.target.value)}} 
                   checked={discountSort==='40'}
                   />
            <label>40% Off and more</label>
          </div>

          {/* <div className="sort-options">
            <input type="radio" 
                   name="discount-sort"  
                   value={0} className='checkbox' 
                   onChange={(event)=>{setDiscountSort(event.target.value)}} 
                   checked
                   />
            <label>All</label>
          </div> */}
        </div>

        <button onClick={revertSort} >Clear</button>

      </div>
      
          <ProductListInner products={filteredProducts} loading={prodcutsLoading} />

          
    </div>
  )
}



//Sorting :
// Ratings Discount Price(min max)
