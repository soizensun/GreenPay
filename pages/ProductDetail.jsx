import { useEffect, useState, useLocalStorage } from "react";
import Axios from 'axios';
import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil';
import MainLayout from "../layouts/MainLayout";
import { clickedProduct as clickedProductAtom } from "../recoil/atoms";
import FoodDetail from "../components/FoodDetail";

const HEADERS = { headers: { 'Content-Type': 'application/json' } }

export default function Test() {
    const [clickedProduct, setClickedProduct] = useRecoilState(clickedProductAtom)
    const [product, setProduct] = useState({});


    useEffect(() => {
        Axios.post("/api/getProductDetail", JSON.stringify({ productId: localStorage.getItem('productDetail') }), HEADERS)
            .then((res) => {
                setProduct(res.data)
            })
    }, [])

    return (
        <MainLayout>
            <FoodDetail product={product}/>
        </MainLayout>
    )

}
