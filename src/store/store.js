import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './slices/cartSlice';
import userReducer from './slices/userSlice';
import productsReducer  from './slices/productSlice';
import wishlistReducer from './slices/wishlistSlice'

const store =configureStore({
    reducer:{
        userProducts:cartReducer,
        users:userReducer,
        products:productsReducer,
        wishlist: wishlistReducer
    }
})

export default store;