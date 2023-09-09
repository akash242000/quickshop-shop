const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit")

const initialState={
    wishlist:[],
}

// const URL ="http://localhost:5000/wishlist"
const URL = `${process.env.REACT_APP_URL}/wishlist`

export const getWishlist = createAsyncThunk('wishlist/getWishlist', async(authToken)=>{
    try {
        const response = await fetch(`${URL}/`,{
            method:'GET',
            headers:{
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Credentials': 'true',
                'auth-token': authToken
                }
            }
            );
        const data= await response.json();
        if(!response.ok){
            throw new Error("Error")
        }

        return data;
    } catch (error) {   
        console.log(error);
        throw error;
    }
})

export const addWishlistItem = createAsyncThunk('wishlist/addWishlistItem', async({authToken,productId})=>{
    try {
        const response = await fetch(`${URL}/addItem/${productId}`,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Credentials': 'true',
                'auth-token': authToken
                }
            }
            );
        const data= await response.json();
        if(!response.ok){
            throw new Error("Error")
        }

        return data;
    } catch (error) {   
        console.log(error);
        throw error;
    }
})


export const deleteWishlistItem = createAsyncThunk('wishlist/deleteWishlistItem', async({authToken,productId})=>{
    try {
        const response = await fetch(`${URL}/deleteItem/${productId}`,{
            method:'DELETE',
            headers:{
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Credentials': 'true',
                'auth-token': authToken
                }
            }
            );
        const data= await response.json();
        console.log(data)
        if(!response.ok){
            throw new Error("Error")
        }

        return data;
    } catch (error) {   
        console.log(error);
        throw error;
    }
})




const wishlistSlice= createSlice({
    name:'wishlist',
    initialState,
    reducers:{

    },

    extraReducers:(builder)=>{
        builder
        .addCase(getWishlist.fulfilled, (state, action)=>{
            state.wishlist= action.payload;
        })

        .addCase(addWishlistItem.fulfilled, (state, action)=>{
            state.wishlist=action.payload;
        })

        .addCase(deleteWishlistItem.fulfilled, (state, action)=>{
            state.wishlist=action.payload;
        })
    }
})

export const getWishlistAll = (state)=> state.wishlist.wishlist;

export const checkInWishlist = (state, productId)=>{
    return state.wishlist.wishlist.some(item=> item===productId)
}

export default wishlistSlice.reducer;