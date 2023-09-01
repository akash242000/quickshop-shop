import React from 'react'
import { useSelector } from 'react-redux'
import { searchProducts } from '../../store/slices/productSlice';
import { useParams } from 'react-router-dom';
import ProductList from '../ProductList/ProductList';

export default function SearchProducts() {

    const params= useParams();


  return (
    <ProductList filter={params.query} />
  )
}
