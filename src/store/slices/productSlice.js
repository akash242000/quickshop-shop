import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState={
    products:[],
    dealsOfDay:[],
    status:'idle',
    error:null
}

// const URL = "http://localhost:5000/products";
const URL = `http://localhost:5000/products`;

export const fetchProducts= createAsyncThunk('products/fetchProducts', async()=>{
    try {
        const response = await fetch(`${URL}/all`, {
            method:'GET',
            headers:{
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Credentials': 'true'
            }
        });

        const data= await response.json();
        return data;
        

    } catch (error) {
        return error;
    }
})

export const fetchDealsOfDay = createAsyncThunk('products/fetchDealsOfDay', async()=>{
    try {
        const response =await fetch(`${URL}/dealsOfDay`, {
            method:'GET',
            headers:{
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Credentials': 'true'
            }
        });
        
        const data= await response.json();
        return data;

    } catch (error) {
        return error;
    }
})


export const addProductReview = createAsyncThunk('products/addProductReview', async({authToken, userReview})=>{
    try {
        const {productId, comment, rating} = userReview;

        const response =await fetch(`http://localhost:5000/reviews/addReview/${productId}`, {
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Credentials': 'true',
                'auth-token':authToken
            },
            body:JSON.stringify({productId, comment, rating})
        });
        const data= await response.json();
        return {data,productId};

    } catch (error) {
        return error;
    }
})

const productSlice= createSlice({
    name:'products',
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchProducts.pending, (state, action)=>{
            state.status='loading'
        })
        .addCase(fetchProducts.fulfilled, (state, action)=>{
            state.products= action.payload;
            state.status='fullfilled';
        })
        .addCase(fetchDealsOfDay.fulfilled, (state, action)=>{
            state.dealsOfDay=action.payload;
        })

        .addCase(addProductReview.fulfilled, (state, action)=>{
            state.products= state.products.map((product)=>{
                if(product.product_id===action.payload.productId){
                    return {...product, product_reviews:action.payload.data}
                }      
                return product
            }
            )
        })
    }
});


export default productSlice.reducer;

export const getProductbyId=(state, productId)=>{
    const product= state.products.products.find(item=> item.product_id === productId);
    return product  ;
}

export const searchProducts = (state, productName)=>{
    return state.products.products.filter((item)=> item.product_name.toLowerCase().includes(productName.toLowerCase()))
}

export const productStatus = (state)=> state.products.status;
export const getProductPrice= (state,productId)=> {
    const product = state.products.products.find(item=> item.product_id===productId)
    return product.product_price;
}

export const allProducts= (state)=>state.products.products;
export const productsLoading =(state) =>state.products.status;
export const dealsOfDayProducts = (state)=> state.products.dealsOfDay;

