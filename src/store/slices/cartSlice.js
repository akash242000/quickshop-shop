import { create } from '@mui/material/styles/createTransitions';
import {createAsyncThunk, createSlice, nanoid} from '@reduxjs/toolkit';


const initialState={
    userProducts:[],
    status:'idle',
    error:null
}

const URL = 'http://localhost:5000/cart';

export const fetchUserCart = createAsyncThunk('userProducts/fetchUserCart', async (authToken)=>{
    try {
        const response = await fetch(`${URL}/`,{
            method:'GET',
            headers:{
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Credentials': 'true',
                'auth-token': authToken
            }
        });
        const data = await response.json();
        return await data;
    } catch (error) {
        return error;
    }
})

export const addCartItem = createAsyncThunk('userProducts/addCartItem', async({authToken,productId})=>{

    try {
        const response = await fetch(`${URL}/addItem/${productId}`,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Credentials': 'true',
                'auth-token': authToken
            }
        });

        if(!response.ok){
            throw new Error("Product already Added")
        }

        const data = await response.json();

        return await data; 
    } catch (error) {
        console.log(error);
        throw error;
    }
})

export const changeProductQuantity = createAsyncThunk('userProducts/changeProductQuantity', async({authToken,productId,quantity})=>{
    try {
        const response = await fetch(`${URL}/updateItems/${productId}`,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Credentials': 'true',
                'auth-token': authToken
            },
            body:JSON.stringify({item_quantity:quantity})
        });
        if(!response.ok){
            throw new Error("Product already Added")
        }

        const data = await response.json();

        return await data; 
    } catch (error) {
        console.log(error);
        throw error;
    }
})

export const deleteCartItem = createAsyncThunk('userProducts/deleteCartItem', async({authToken,productId})=>{
    try {
        const response = await fetch(`${URL}/removeItem/${productId}`,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Credentials': 'true',
                'auth-token': authToken
            },

        });
        if(!response.ok){
            throw new Error("Error!")
        }

        const data = await response.json();

        return await data; 
    } catch (error) {
        console.log(error);
        throw error;
    }
})


const cartSlice =createSlice({
    name:'userProducts',
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchUserCart.fulfilled, (state, action)=>{
            state.userProducts=action.payload;
        })

        .addCase(addCartItem.fulfilled, (state, action)=>{
            state.userProducts= action.payload;
            state.status='fulfilled'
        })
        .addCase(addCartItem.pending, (state, action)=>{
            state.status='loading'
        })

        .addCase(changeProductQuantity.fulfilled, (state, action)=>{
            state.userProducts= action.payload;
        })

        .addCase(deleteCartItem.fulfilled, (state, action)=>{
            state.userProducts=action.payload;
        })
    }
})

export const userCartItems = (state)=> state.userProducts.userProducts;
export const cartItemAddedStatus = (state)=>state.userProducts.status;

export const checkInCart=(state,productID)=>{
    return state.userProducts.userProducts.some(item=> item.productId===productID)
}

export default cartSlice.reducer;