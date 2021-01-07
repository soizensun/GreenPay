import React from 'react'
import MainLayout from "../layouts/MainLayout";
import ProductDetail from "../components/ProductDetail";


export default function ProductDetails() {
    return (
        <MainLayout>
            {localStorage.getItem('productDetail')}
            {/* <ProductDetail productId={localStorage.getItem('productDetail')}/> */}
        </MainLayout>
    )

}
