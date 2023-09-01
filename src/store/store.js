import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './slices/cartSlice';
import userReducer from './slices/userSlice';
import productsReducer  from './slices/productSlice';

const store =configureStore({
    reducer:{
        userProducts:cartReducer,
        users:userReducer,
        products:productsReducer
    }
})

export default store;