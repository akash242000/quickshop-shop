import React from 'react'
import { useParams } from 'react-router-dom'
import ProductList from './ProductList/ProductList';

export default function CategoryList() {

    const params = useParams();

  return (
    <ProductList category={params.category}/>
  )
}
