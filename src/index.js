import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store/store'
import { Provider } from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import { fetchProducts } from './store/slices/productSlice';
import { fetchUserCart } from './store/slices/cartSlice';
import { getWishlist } from './store/slices/wishlistSlice';

store.dispatch(fetchProducts());

if(localStorage.getItem('auth-token')){
  store.dispatch(fetchUserCart(localStorage.getItem('auth-token')))
  store.dispatch(getWishlist(localStorage.getItem('auth-token')))
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>  
  
);

reportWebVitals();
