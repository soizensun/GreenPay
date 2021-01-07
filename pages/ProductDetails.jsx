import React from 'react'
import MainLayout from "../layouts/MainLayout";
import ProductDetail from "../components/ProductDetail";


export default function ProductDetails() {
    return (
        <MainLayout>
            <ProductDetail productId={(typeof window !== "undefined") ? `${localStorage.getItem('productDetail')}` : ""}/>
        </MainLayout>
    )

}
